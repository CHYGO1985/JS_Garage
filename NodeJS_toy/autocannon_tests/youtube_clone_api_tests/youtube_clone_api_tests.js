const autocannon = require("autocannon");
const fs = require("fs/promises");

// read array of items from exported .json file from postman
let entries = undefined;

async function getRequests()
{
    const data = await fs.readFile("./youtube_clone_proj.postman_collection.json", "UTF-8");
    // do your stuff with data
    entries = JSON.parse(data).item;
    return true;
}

async function test() {
  await getRequests();
  // console.log(requests[0].item[0].request);

  entries.map(async (entry) => {
    // there are multi request in item
    // console.log(entry.item);
    entry.item.filter((ele) => {
      // filter the empty request
      return ele.request.url !== undefined;
      //  && ele.request.body !== undefined;
    }).map(async (ele) => {
      // console.log(JSON.stringify(ele.request.body));
      console.log(ele.request.method + " " + ele.request.url.raw);
      const result = await autocannon({
        url: ele.request.url.raw,
        method: ele.request.method,
        connections: 100,
        workers: 50,
        duration: 5,
        body: ele.request.body === undefined? null : JSON.stringify(ele.request.body),
         // read other options here: https://github.com/mcollina/autocannon#autocannonopts-cb
      }, finishedBench);
      // or print table
      // result = (!result) ? {} : result;
      // autocannon.printResult(result);

      // track process
      autocannon.track(result, {renderProgressBar: false});

      // this is used to kill the instance on CTRL-C
      process.once('SIGINT', () => {
        result.stop()
      })

      function finishedBench (err, res) {
        console.log('finished bench', err, res)
      } 
    });
  });
};

test();

