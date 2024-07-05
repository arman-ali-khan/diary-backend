const db = require('../config/db.config');

const User = {
  getAll: (result) => {
    db.query('SELECT * FROM users', (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  },

  create: (newUser, result) => {
    db.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      result(null, { id: res.insertId, ...newUser });
    });
  },


  findById: (id, result) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  },
  
  findByEmail: (email, result) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  }
};

module.exports = User;
