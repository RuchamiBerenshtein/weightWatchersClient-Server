const meetingService = require('../services/meetingService');

const getAllMeeting = async (req, res) => {
    try {
        const users = await meetingService.getAll();
        res.send(users);
    }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
}

const getMeetingById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const meeting = await meetingService.getMeetingById(id);
        res.status(200).json({
            meeting
        })
    }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
}

const addMeeting = async (req, res) => {

    try {
        if (req.body) {
            const { date } = req.body;
            const { weights } = req.body;
            const created = await meetingService.addMeeting(weights, date);
            res.send(created);
        }
        else {
            res.status(400).json({
                massage: `you have to send a weights`
            })
        }
    }
    catch (err) {
        res.status(500).json({
            massage: `write to json was failed ${err}`
        })
    }
}

const updateMeeting = async (req, res) => {
    const id = parseInt(req.params.id);
    const { meeting } = req.body;
    const { weights } = req.body;

    if (id !== meeting.id) {
        res.status(400).json({
            massage: 'there is not a same meeting'
        });
    }

    const existingMeet = meetingService.getMeetingById(id);
    if (!existingMeet) {
        res.status(400).json({
            massage: 'meeting is not find'
        })
    }

    meetingService.updateMeeting(meeting, weights);
    res.status(200).json({
        massage: `user ${meeting.id} is updated`
    })
}

const deleteMeeting = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleteMeeting = await meetingService.deleteMeeting(id)
        res.status(200).json({
            massage: `meeting ${deleteMeeting + 1} was deleted`
        })

    }
    catch (err) {
        res.status(500).json({
            massage: `writing to json was failed ${err}`
        })
    }
}

module.exports = {
    getAllMeeting,
    getMeetingById,
    addMeeting,
    updateMeeting,
    deleteMeeting
}