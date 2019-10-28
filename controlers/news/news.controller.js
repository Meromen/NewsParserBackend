const redisClient = require("../../_helpers/redis");

function getNews(req, res) {
  redisClient.get("NEWS", (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(JSON.parse(data));
  });
}

module.exports = {
  getNews
};
