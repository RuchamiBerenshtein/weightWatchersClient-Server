const meetingService = require('../services/meetingService');

module.exports.getAllMeeting = async function (req, res) {
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

module.exports.getMeetingById = async function (req, res) {
    
}

module.exports.adMeeting = async function (req, res) {
    
}

module.exports.updateMeeting = async function (req, res) {
    
}

module.exports.deleteMeeting = async function (req, res) {
    
}

