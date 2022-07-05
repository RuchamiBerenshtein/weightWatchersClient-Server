const express = require('express');
const router = express.Router();
const diaryController = require('../Controllers/diaryController');


router.get('/:id/diary', diaryController.getDiary);

router.post('/:id/diary',diaryController.addNewDay);

router.post('/:id/diary/:id',diaryController.updateDay);

router.delete('/:id/diary/:id',diaryController.deleteDay);

module.exports = router;