const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static HTML file
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
