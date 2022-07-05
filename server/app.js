const express = require('express');
const app = express();
const cors = require('cors');
const user = require('./Routs/userRout');
const diary = require('./Routs/diaryRout');
const meeting = require('./Routs/meetingRout');
const account = require('./Routs/accountRout');

const port = 8080


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());



app.use('/api/User', user);
app.use('/api/Diary', diary);
app.use('/api/Meeting', meeting);
app.use('/api/Account', account)

app.listen(port, () => {
  console.log(`Example app listening on port ${port} :)`)
})