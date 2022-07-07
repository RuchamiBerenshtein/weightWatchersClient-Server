const fs = require('fs');

const data = fs.readFileSync('data/users.json');
const users = JSON.parse(data).users;

const saveToFile = async () => {
    fs.writeFileSync('data/users.json', users, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

const getAll = async () => {
    console.log(users);
    return users;
}

const getById = async (id) => {
    const user = users.find(user => user.id === id);
    return user;
}

const updateUser = async (user) => {
    const index = users.indexOf(u => u.id === user.id);
    if (index === -1)
        return;

    users[index] = user;
    await saveToFile();
}

export default {
    getAll,
    getById,
    updateUser,

}
