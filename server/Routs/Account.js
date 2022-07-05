const express = require('express'); 
const router = express.Router();
const accountController = require('../Controllers/Account');

router.post('/', accountController.addAccount);