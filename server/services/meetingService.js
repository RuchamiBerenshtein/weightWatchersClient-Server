const fs = require('fs');

const usersData = fs.readFileSync('data/users.json');
const users = JSON.parse(usersData).users;

const meetingsData = fs.readFileSync('data/meeting.json');
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

const addMeeting = async (weights, date) => {
    let meeting = {
        "id": meetings.length + 1,
        "date": date
    }
    meetings.push(meeting);

    let i = 0;
    weights.forEach(weight => {
        users[i].details.meetings.push({ "id": meeting.id, "weight": weight });
        i++;
    })

    await saveToUsersFile();
    await saveToMeetingFile();

    return meeting;
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