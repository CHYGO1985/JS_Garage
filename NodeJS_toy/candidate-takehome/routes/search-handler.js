const { Op } = require("sequelize");
const db = require('../models');

module.exports = async (req, res) => {
  try {
    const {name, platform} = req.body
    let where = null
    if(name && platform){
      where = {
        name:{
          [Op.substring]: name
        },
        platform
      }
    }

    if(name && !platform){
      where = {
        name:{
          [Op.substring]: name
        }
      }
    }

    if(!name && platform){
      where = {
        platform
      }
    }

    let games = await db.Game.findAll({
      where
    })

    if (games.length === 0) {
      games = await db.Game.findAll();
    }

    return res.send(games);
  } catch (err) {
    console.error('There was an error seaching games', err);
    return res.send(err);
  }
};