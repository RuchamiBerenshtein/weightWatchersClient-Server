const express = require('express');
const router = express.Router();
const meetingController = require('../Controllers/meetingController');



router.get('/', meetingController.getAllMeeting);

router.get('/:id', meetingController.getMeetingById);

router.post('/', meetingController.adMeeting);

router.put('/:id', meetingController.updateMeeting);

router.delete('/:id', meetingController.deleteMeeting);

