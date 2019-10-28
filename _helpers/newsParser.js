const DOMParser = require("xmldom").DOMParser;
const fetch = require("node-fetch");
const redis = require("./redis");

class NewsParser {
  constructor(cachename) {
    this.cachename = cachename;
    this.parser = new DOMParser();
    this.updater = setInterval(this.getNews, 10000);

    this.getNews();
  }

  stop = () => {
    clearInterval(this.updater);
  };

  getNews = async () => {
    try {
      const response = await fetch(
        "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en"
      );
      const data = await response.text();

      let xmlDoc = this.parser.parseFromString(data, "text/xml");
      let news = xmlDoc.getElementsByTagName("title");

      let newData = [];
      for (let i = 1; i < news.length; i++) {
        newData.push(news[i].firstChild.data);
      }

      redis.client.set(this.cachename, JSON.stringify(newData), (err, data) => {
        if (err) throw err;
        console.log("News updated...");
      });
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = NewsParser;
