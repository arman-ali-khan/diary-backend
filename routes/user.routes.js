module.exports = app => {
    const users = require("../controllers/user.controller");
  
    var router = require("express").Router();
  
    router.post("/", users.create);
    router.get("/", users.findAll);
    router.get("/:id", users.findOne);
    router.post("/login", users.login);
  
    app.use('/api/users', router);
  };
  