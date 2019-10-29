const redis = require("../../_helpers/redis");

function getNews(req, res) {
  redis
    .getNews("NEWS")
    .then(data => res.json(JSON.parse(data)))
    .catch(err => res.status(500).send(err));
}

module.exports = {
  getNews
};
