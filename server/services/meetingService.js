const fs = require('fs');
const meetingsData = fs.readFileSync('data/meeting.json');
const usersData = fs.readFileSync('data/users.json');
const users = JSON.parse(usersData).users;
const meetings = JSON.parse(meetingsData).meetings;


const saveToMeetingFile = async () => {
    const json = JSON.stringify({ 'meetings': meetings })
    await fs.writeFileSync('data/meeting.json', json, (err) => {
        if (err) throw err;
    });
}

const saveToUsersFile = async () => {
    const json = JSON.stringify({ 'users': users })
    await fs.writeFileSync('data/users.json', json, (err) => {
        if (err) throw err;
    });
}

const getAll = async () => {
    return await meetings;
}

const getMeetingById = async (id) => {
    const user = meetings.find(meeting => meeting.id === id);
    return await user;
}

const addMeeting = async (weights) => {
    let meeting = {
        id : meetings.length + 1,
        date : new Date()
    }
    meetings.push(meeting);
   console.log(meetings);

    let i = 0;
    weights.forEach( weight => {
        
        users[i].details.weight.push(weight);
        users[i].meeting.push({"id": meeting.id, "weight": weight.value});
        i++;
    })
    await saveToUsersFile();
    await saveToMeetingFile();
}

module.exports = {
    getAll,
    getMeetingById,
    addMeeting
}