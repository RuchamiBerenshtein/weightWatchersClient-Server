const express = require('express'); 
const router = express.Router();
const accountController = require('../Controllers/accountController');

router.post('/', accountController.addAccount);

module.exports = router;
