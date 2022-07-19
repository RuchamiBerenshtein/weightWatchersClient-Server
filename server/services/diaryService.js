const fs = require('fs');
const diaryModel = require('../models/diaryModel')
const userModel = require('../models/userModel');


const getDiary = async (id) => {
    const diaries = diaryModel.find();
    return diaries;
}

const addNewDay = async (id, newDay) => {
    const insertedDiary = await newDay.save();

    const user =await userModel.findOne({ id: id });

    console.log(user.details);
    console.log(insertedDiary._id);

    user.details.diary.push({ "id": insertedDiary._id });
    await updateUser(user.details, user._id);
    return insertedDiary;
}

const updateUser = async (details, id) => {
    await userModel.updateOne({ _id: id },
        {
            $set:
            {
                details: details
            }
        });
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