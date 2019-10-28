const { Router } = require("express");
const router = Router();

const newsController = require("../controlers/news/news.controller");

router.get("/news", newsController.getNews);

module.exports = router;
