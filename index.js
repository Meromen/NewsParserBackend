const express = require("express");
const newsRoutes = require("./routes/news");
const PORT = process.env.PORT || 5000;
const NewsParser = require("./_helpers/newsParser");

const app = express();
const newsParser = new NewsParser("NEWS");

app.use(newsRoutes);

app.use(express.urlencoded({ extended: true }));

function start() {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

start();
