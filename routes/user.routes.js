const auth = require("../middleware/auth");

module.exports = app => {
    const users = require("../controllers/user.controller");

    var router = require("express").Router();
  
    router.post("/", users.create);
    router.get("/", users.findAll);
    router.get("/:id", users.findOne);
    router.post("/login", users.login);
    router.post("/token",auth, users.token);
  
  
    app.use('/api/users', router);
  };
  