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
        const id = parseInt(req.params.id);
        try {
            const meeting = await meetingService.getMeetingById(id);
            res.send(meeting);
        }
        catch (err) {
            res.status(500).json({
                massage: `reading from json was failed ${err}`
            })
        }
}

module.exports.addMeeting = async function (req, res) {
 
    try {
        if (req.body) {
            const  meeting  = req.body.weights;
            const created = await meetingService.addMeeting(meeting);
            console.log(created);
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

module.exports.updateMeeting = async function (req, res) {
    

    
}

module.exports.deleteMeeting = async function (req, res) {
    
}

