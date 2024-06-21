const db = require('../config/db.config');

const Story = {
  getAll: (result) => {
    db.query('SELECT * FROM stories', (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  },

  create: (newStory, result) => {
    db.query('INSERT INTO stories SET ?', newStory, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      result(null, { id: res.insertId, ...newStory });
    });
  },

  findById: (id, result) => {
    db.query('SELECT * FROM stories WHERE id = ?', [id], (err, res) => {
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

module.exports = Story;
