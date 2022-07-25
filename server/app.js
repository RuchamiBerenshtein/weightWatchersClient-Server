const express = require('express');
const db = require('./DB/dataBase')
const app = express();
const cors = require('cors');
const user = require('./Routs/userRout');
const diary = require('./Routs/diaryRout');
const meeting = require('./Routs/meetingRout');
const account = require('./Routs/accountRout');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const { auth } = require('express-openid-connect');
const port = 3000;
const { requiresAuth } = require('express-openid-connect');


db.connect();


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'PUXVNcvCQ5hIfUWZvFrXayrZIEAEBSDk',
  issuerBaseURL: 'https://dev-wvph8f3k.us.auth0.com'
};
app.use(cors());
app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


app.use(express.json());
app.use(express.urlencoded());
app.use('/user', requiresAuth(), user);
app.use('/diary', requiresAuth(), diary);
app.use('/account',account);
app.use('/meeting', requiresAuth(), meeting);
//app.use('/user', user);
// app.use('/diary', diary);
// app.use('/account', account);
// app.use('/meeting', meeting);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port} :)`)
})


