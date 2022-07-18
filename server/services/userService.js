const fs = require('fs');
const userModel = require('../models/userModel')

const data = fs.readFileSync('data/users.json');
const users = JSON.parse(data).users;

const saveToFile = async () => {
    const json = JSON.stringify({ 'users': users })
    await fs.writeFileSync('data/users.json', json, (err) => {
        if (err) throw err;
    });
}

const getAll = async () => {
    const users = await userModel.find();
    return users;
}

// const email = req.params.email;
// const password = req.params.password;

// const user = await userModel.findOne({ email: email, password: password });

// await res.send(user);

const getById = async (id) => {
    const user = userModel.findOne({id: id});
    return user;
}

// const addUser = async (user) => {
//     user.id = users.length + 1;
//     users.push(user);
//     await saveToFile();
//     return user.id;
// }

const addUser = async (user) => {
    const insertedUser=await user.save();
    return insertedUser;
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

const searchBMI = async (minBMI, maxBMI) => {
    const filterUsers = [];

    for (let i = 0; i < users.length; i++) {
        const BMI = users[i].details.meetings[users[i].details.meetings.length - 1].weight / users[i].details.hight ** 2;
        if (BMI >= minBMI && BMI <= maxBMI) {
            filterUsers.push(users[i]);
        }
    }
    return filterUsers;
    // return await users.filter(user =>
    //     user.details.weight[user.details.weight.length - 1] / user.hight ** 2 >= minBMI &&
    //     user.details.weight[user.details.weight.length - 1] / user.hight ** 2 <= maxBMI
    // );
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
    return filterUsers;
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
