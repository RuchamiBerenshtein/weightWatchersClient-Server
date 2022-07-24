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

require("dotenv").config();

const port = 3000;
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'yRs4i-KNyqjNV-JQz2lYW0lOtlBZf9yS_ISzi9c0go_Bb5o47BwyIG3fv7X2cPdw',
  baseURL: 'http://localhost:3000',
  clientID: '420F0Ya1QUq6QlBUHxgPAZeYdi0EVEaz',
  issuerBaseURL: 'https://dev-yi6ikgik.us.auth0.com'
};

db.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/user', user);
app.use('/diary', diary);
app.use('/account', account);
app.use('/meeting', meeting);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
 
app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port} :)`)
})


