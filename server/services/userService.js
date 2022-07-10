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

    if (index === -1) {
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
    const index = users.map(user => user.id).indexOf(user.id);

    if (index === -1)
        return;

    users[index] = user;
    await saveToFile();
}

const searchByFreeText = async (text) => {

    const filterUsers = [];

    for (let i = 0; i < users.length; i++) {
        if (users[i].details.firstName.includes(text) ||
            users[i].details.lastName.includes(text) ||
            users[i].details.email.includes(text) ||
            users[i].details.phone.includes(text)) {
            filterUsers.push(users[i]);
        }
    }
    // await users.filter(user => user.details.firstName.includes(text) ||
    //     updateUser.details.lastName.includes(text) ||
    //     updateUser.details.email.includes(text) ||
    //     updateUser.details.phone.includes(text));
    return filterUsers;
}

const searchBMI = async (minBMI, maxBMI) => {
    const filterUsers = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].details.weight[users[i].details.weight.length - 1] / users[i].details.hight ** 2 >= minBMI &&
            users[i].details.weight[users[i].details.weight.length - 1] / users[i].details.hight ** 2 <= maxBMI) {
            filterUsers.push(users[i]);
        }
    }
    return filterUsers;
    // return await users.filter(user =>
    //     user.details.weight[user.details.weight.length - 1] / user.hight ** 2 >= minBMI &&
    //     user.details.weight[user.details.weight.length - 1] / user.hight ** 2 <= maxBMI
    // );
}

module.exports = {
    getAll,
    getById,
    addUser,
    deleteUser,
    updateUser,
    searchByFreeText,
    searchBMI,

}
