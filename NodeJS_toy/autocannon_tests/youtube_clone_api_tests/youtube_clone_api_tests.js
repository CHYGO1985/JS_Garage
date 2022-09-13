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
    // console.log(request.item);
    entry.item.filter((ele) => {
      // filter the empty request
      return ele.request.url !== undefined;
    }).map(async (ele) => {
      console.log(ele.request.url?.raw);
      // const result = await autocannon({
      //   url: ele.request.url.raw,
      //   method: ele.request.method,
      //    // read other options here: https://github.com/mcollina/autocannon#autocannonopts-cb
      // });
      // // or print table
      // autocannon.printResult(result);
    });
  });
  // for (const item of requests) {
  //   // test request using autocannon, pass the method, body, etc. on the autocannon options
  //   // you might need to manipulate your data in item so you can pass it to autocannon
    
  //   console.log(`Testing ${item}`);

  //   const result = await autocannon({
  //     url: item.request.url.raw,
  //     method: item.request.method,
  //      // read other options here: https://github.com/mcollina/autocannon#autocannonopts-cb
  //   })
  //   // console.log(result);
  //   // or print table
  //   autocannon.printResult(result);
  // }
};

test();