const NewsParser = require("./_helpers/newsParser");
const redis = require("./_helpers/redis");

const firstNewsParser = new NewsParser("TEST1");
const secondNewsParser = new NewsParser("TEST2");

const firstTest = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let firstNews = await redis.getNews("TEST1");
      let secondNews = await redis.getNews("TEST2");
      console.log(firstNews);
      console.log(secondNews);
      if (firstNews != secondNews) {
        reject("Test failed news must be similar");
      } else {
        resolve("Test completed");
      }
    } catch (err) {
      throw err;
    }
  });
};

setTimeout(async () => {
  try {
    console.log(await firstTest());
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}, 1000);
