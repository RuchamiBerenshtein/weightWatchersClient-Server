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
const { auth, requiresAuth } = require('express-openid-connect');
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

app.use(auth(config));
// res.send(req.oidc.isAuthenticated() ? JSON.stringify(req.oidc.user) : 'Logged out');

app.get('/', (req, res) => {
  console.log(JSON.stringify(req.oidc.user));
  if (req.oidc.isAuthenticated()) {
      const email = JSON.stringify(req.oidc.user.email);
      console.log(email);
      const newEmail = email.slice(1, email.length - 1);
      // res.send('Logged in');
      if (newEmail === 'p0548453160@gmail.com') {
          console.log('manager');
          url = 'http://127.0.0.1:5501/index.html';
          res.redirect(url);
      } else {
          console.log('user');
          url = `http://127.0.0.1:5501/userDetails.html?email=${newEmail}`;
          res.redirect(url);
      }
      //res.cookie('cookieFromAuth0', req.cookies.fromAuth0);
  } else {
      res.send('Logged out');
  }
});

app.get('/profile', (req, res) => {
  console.log(JSON.stringify(req.oidc.user));
  res.send(JSON.stringify(req.oidc.user));
});
app.use('/user', user);
app.use('/diary', diary);
app.use('/account', account);
app.use('/meeting', meeting);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port} :)`)
})


