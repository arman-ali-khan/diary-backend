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

  createOrUpdate: (story, result) => {
    const query = `
      INSERT INTO stories (storyId, title, description)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        description = VALUES(description)
    `;

    db.query(query, [story.storyId, story.title, story.description], (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.insertId) {
        // Inserted new story
        result(null, { id: res.insertId, ...story });
      } else {
        // Updated existing story
        result(null, { id: story.storyId, ...story });
      }
    });
  },

  createPart: (part, result) => {
    db.query('INSERT INTO storyParts SET ?', part, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      result(null, { id: res.insertId, ...part });
    });
  },

  findPartsById: (id, result) => {
    db.query('SELECT * FROM storyParts WHERE storyId = ?', [id], (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  },
  findById: (id, result) => {
    db.query('SELECT * FROM stories WHERE storyId = ?', [id], (err, res) => {
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
