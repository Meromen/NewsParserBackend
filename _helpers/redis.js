const redis = require("redis");

const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const getNews = name => {
  return new Promise((resolve, reject) => {
    client.get(name, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = { client, getNews };
