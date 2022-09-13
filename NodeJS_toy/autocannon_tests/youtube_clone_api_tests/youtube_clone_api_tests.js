const autocannon = require("autocannon");
const fs = require("fs/promises");

// read array of items from exported .json file from postman
let requests = undefined;

async function getRequests()
{
    const data = await fs.readFile("./youtube_clone_proj.postman_collection.json", "UTF-8");
    // do your stuff with data
    // requests = data;
    requests = JSON.parse(data).item;
    return true;
}


async function test() {
  await getRequests();

  console.log(requests[0].item);

  // requests.map(async (item) => {
  //   // console.log(item);

  //   const result = await autocannon({
  //     url: item.request.url.raw,
  //     method: item.request.method,
  //      // read other options here: https://github.com/mcollina/autocannon#autocannonopts-cb
  //   })
  //   // console.log(result);
  //   // or print table
  //   autocannon.printResult(result);
  // });
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