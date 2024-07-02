const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors())

require("./routes/user.routes")(app);
require("./routes/story.routes")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;