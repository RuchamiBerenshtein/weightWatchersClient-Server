const fs = require('fs');
const meetingModel = require('../models/meetingModel');
const userModel = require('../models/userModel');


const getAll = async () => {
    const meetings = await meetingModel.find();
    return meetings;
}

const getMeetingById = async (id) => {
    const meeting =await meetingModel.findOne({id: id});
    return meeting;
}

const addMeeting = async (weights, meeting) => {

    const insertedMeeting = await meeting.save();

    const users = await userModel.find();
    console.log(users);
    let i = 0;
    weights.forEach(weight => {
        users[i].details.meetings.push({ "id": insertedMeeting._id, "weight": weight });

        userModel.updateOne({ id: users[i].id },
            {
                $set:
                {
                    details: users[i].details
                }
            });
        i++;
    })

    return insertedMeeting;
}

const updateMeeting = async (meeting, weights) => {
    const index = meetings.map(meet => meet.id).indexOf(meeting.id);

    if (index === -1)
        return;

    meetings[index] = meeting;

    for (let i = 0; i < users.length; i++) {
        const index = users[i].details.meetings.map(meet => meet.id).indexOf(meeting.id);
        users[i].details.meetings[index].weight = weights[i];
    }
    await saveToMeetingFile();
    await saveToUsersFile();
}

const deleteMeeting = async (id) => {
    const index = meetings.map(meet => meet.id).indexOf(id);

    if (index === -1) {
        return;
    }

    meetings.splice(index, 1);

    for (let i = index; i < meetings.length; i++) {
        meetings[i].id -= 1;
    }

    for (let i = 0; i < users.length; i++) {
        const index = users[i].details.meetings.map(meet => meet.id).indexOf(id);
        users[i].details.meetings.splice(index, 1);

        for (let j = index; j < users[i].details.meetings.length; j++) {
            users[i].details.meetings[j].id -= 1;
        }
    }

    await saveToMeetingFile();
    await saveToUsersFile();

    return index;
}

module.exports = {
    getAll,
    getMeetingById,
    addMeeting,
    updateMeeting,
    deleteMeeting
}