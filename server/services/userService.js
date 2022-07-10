const fs = require('fs');
const { format } = require('path');

const data = fs.readFileSync('data/users.json');
const users = JSON.parse(data).users;

const saveToFile = async () => {
    const json = JSON.stringify({ 'users': users })
    await fs.writeFileSync('data/users.json', json, (err) => {
        if (err) throw err;
    });
}

const getAll = async () => {
    return users;
}

const getById = async (id) => {
    id = parseInt(id)
    const user = users.find(user => user.id === id);
    return await user;
}

const addUser = async (user) => {
    user.id = users.length + 1;
    users.push(user);
    saveToFile();
    return user.id;
}

const deleteUser = async (id) => {

const index = users.map(user => user.id).indexOf(id);

    if (index === -1){
        return;
    }

    users.splice(index, 1);

    await saveToFile();

    for (let i = index; i < users.length; i++) {
        users[i].id = users[i].id - 1;
    }

    return index;
}

const updateUser = async (user) => {
    const index = users.indexOf(u => u.id === user.id);
    if (index === -1)
        return;

    users[index] = user;
    await saveToFile();
}

module.exports = {
    getAll,
    getById,
    addUser,
    deleteUser,
    updateUser
}
