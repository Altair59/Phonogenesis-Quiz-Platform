const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

app.get("/", function(req, res, next) {
    res.send({message: "API is working properly"});
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, 90 => {
  console.log(`Listening on port ${port} ...`);
});
