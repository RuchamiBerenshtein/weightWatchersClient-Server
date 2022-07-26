const fs = require('fs');
const userModel = require('../models/userModel')



const getAll = async () => {
    const users = await userModel.find();
    return users;
}

const getById = async (email) => {
    const user = userModel.findOne({ email: email });
    if (!user)
        throw new Error('No user not found with given id');
    return user;
 }

 const addUser = async (user) => {
    const insertedUser = await user.save();
    return insertedUser;
}

const deleteUser = async (id) => {
    const toDelete = await userModel.deleteOne({ id: id })
    return toDelete;
}

const updateUser = async (details, id) => {
    await userModel.updateOne({ id: id },
        {
            $set:
            {
                details: details
            }
        });
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
