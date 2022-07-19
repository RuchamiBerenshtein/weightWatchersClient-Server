const express = require('express');
const router = express.Router();
const diaryController = require('../Controllers/diaryController');


router.get('/:id', diaryController.getDiary);

router.post('/:id',diaryController.addNewDay);

router.put('/:id/:dayId',diaryController.updateDay);

router.delete('/:id/:dayId',diaryController.deleteDay);

module.exports = router;