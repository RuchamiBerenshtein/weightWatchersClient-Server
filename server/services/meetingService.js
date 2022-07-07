const fs = require('fs');
const data = fs.readFileSync('data/meeting.json');
const meetings = JSON.parse(data).meetings;


const getAll = async () => {
    return await meetings;
}
module.exports = {getAll}