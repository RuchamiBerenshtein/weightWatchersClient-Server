const fs = require('fs');

const data = fs.readFileSync('data/users.json');
const users = JSON.parse(data).users;

const saveToFile = async () => {
    const json = JSON.stringify({ 'users': users })
    await fs.writeFileSync('data/users.json', json, (err) => {
        if (err) throw err;
    });
}

const getDiary = async (id) => {
    const user = users.find(user => user.id === id);
    return user.diary;
}

const addNewDay = async (id, newDay) => {
    const user = users[users.map(user => user.id).indexOf(id)];
    newDay.id = user.diary.length + 1;
    user.diary.push(newDay);
    await saveToFile();
    return newDay.id;
}

const updateDay = async (id, dayId, day) => {
    const user = users[users.map(user => user.id).indexOf(id)];
    const index = user.diary.map(day => day.id).indexOf(dayId);
    
    if (index === -1)
        return;

    user.diary[index] = day;
    await saveToFile();
    return day;
}

const existingDay = async (id, dayId) => {
    const user = users.find(user => user.id === id);
    return user.diary.find(day => day.id === dayId);
}

const deleteDay = async (id, dayId) => {
    const user = users[users.map(user => user.id).indexOf(id)];
    
    const index = user.diary.map(day => day.id).indexOf(dayId);
    
    if (index === -1) {
        return;
    }
    
    user.diary.splice(index, 1);

    await saveToFile();

    for (let i = index; i < user.diary.length; i++) {
        user.diary[i].id -= 1;
    }

    return index;
}

module.exports = {
    getDiary,
    addNewDay,
    updateDay,
    existingDay,
    deleteDay
}