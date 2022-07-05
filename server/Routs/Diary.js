const express = require('express');
const router = express.Router();
const diaryController = require('../Controllers/Diary');


router.get('/:id/diary', diaryController.getDiary);

router.post('/:id/diary',diaryController.addNewDay);

router.post('/:id/diary/:id',diaryController.updateDay);

router.delete('/:id/diary/:id',diaryController.deleteDay);