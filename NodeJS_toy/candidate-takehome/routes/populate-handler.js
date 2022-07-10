const axios = require('axios');
const db = require('../models');

const constants = require('../utils/constants');

module.exports = async (req, res) => {
  try {
    const originalGames = await db.Game.findAll({})
    const gameStoreId = originalGames.map(item => item.storeId)
    const iosGameData = await axios.get(constants.IOS_TOP100_API)
    const andoridGameData = await axios.get(constants.ANDOIRD_TOP100_API)
    let iosGamesData = iosGameData.data.flat()
    let androidGameData = andoridGameData.data.flat()
    let allData = iosGamesData.concat(...androidGameData)

    allData = allData.filter(data => !gameStoreId.includes(String(data.app_id)) && data.app_id)
    let allTobeInsertedData = allData.map(item => {
      return {
        "publisherId": item.publisher_id,
        "name": item.name,
        "platform": item.os,
        "storeId": item.app_id,
        "bundleId": item.bundle_id,
        "appVersion": item.bundle_id,
        "isPublished": true,
      }
    })
    
    if (allTobeInsertedData.length > 0) {
      await db.Game.bulkCreate(allTobeInsertedData)
    }

    const games = await db.Game.findAll({})
    return res.send(
      games
    )
  } catch (err) {
    console.error('There was an error populating games', err);
    return res.send(err);
  }
};