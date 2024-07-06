module.exports = (app) => {
  const story = require("../controllers/story.controller");

  var router = require("express").Router();

  router.put("/", story.create);
  router.post("/part", story.createPart);
  router.put("/part/:id", story.updatePart);
  router.get("/part/:id", story.findOnePart);
  router.get("/", story.findAll);
  router.get("/:id", story.findOne);

  app.use("/api/stories", router);
};
