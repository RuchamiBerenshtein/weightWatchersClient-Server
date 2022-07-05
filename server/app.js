const express = require('express');
const app = express();
const cors = require('cors');

const port = 8080

connection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})