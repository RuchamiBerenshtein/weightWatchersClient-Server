const express = require('express');
const app = express();
const cors = require('cors');
const user = require('./Routs/userRout');
const diary = require('./Routs/diaryRout');
const meeting = require('./Routs/meetingRout');
const account = require('./Routs/accountRout');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


app.use('/User', user);
app.use('/Diary', diary);
app.use('/Account', account);
app.use('/Meeting', meeting);

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} :)`)
})


