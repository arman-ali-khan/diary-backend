module.exports = (app) => {
  const story = require("../controllers/story.controller");

  var router = require("express").Router();

  router.put("/", story.create);
  router.post("/part", story.createPart);
  router.get("/", story.findAll);
  router.get("/:id", story.findOne);

  app.use("/api/stories", router);
};
