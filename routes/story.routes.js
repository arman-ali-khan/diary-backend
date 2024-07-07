const auth = require("../middleware/auth");

module.exports = (app) => {
  const story = require("../controllers/story.controller");

  var router = require("express").Router();

  router.put("/",auth, story.create);
  router.post("/part",auth, story.createPart);
  router.put("/part/:id",auth, story.updatePart);
  router.get("/part/:id", story.findOnePart);
  router.get("/", story.findAll);
  router.get("/:id", story.findOne);

  app.use("/api/stories", router);
};
