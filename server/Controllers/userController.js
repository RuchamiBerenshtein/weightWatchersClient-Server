const { response } = require('express');
const userService = require('../services/userService');

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(200).json({
            users
        })
    }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
};

search = async function (req, res) {
}

const getUserByID = async function (req, res) {
    const id = req.params.id;
    try {
        const user = await userService.getById(id);
        res.status(200).json({
            user
        })
    }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
}
const updateUser = async function (req, res) {
   
    try { 
        const {id,  firstName, lastName, city, street, number, email, phone, hight, weight } = req.body;
        const userToUpdate = {
            id, 
            firstName,
            lastName,
            address:{ 
                city,
                street,
                number,},
             phone,
            email,
            hight,
            weight
            }
            const id = req.params.id;
            const updateUser = await userService.updateUser(id,userToUpdate);
            res.send(updateUser);
        }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
}

const remove = async function (req, res) {
    const id = req.params.id;
    try {
        const deleteUser = await userService.deleteUser(id)
        res.send(deleteUser)
    }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
}

const addUser = async function (req, res) {

    try {
        if (req.body) {
            const {id,  firstName, lastName, city, street, number, email, phone, hight, weight } = req.body;
            const data = {
                id, 
                firstName,
                lastName,
                address:{ 
                    city,
                    street,
                    number,},
                phone,
                email,
                hight,
                weight
            }
            const created = await userService.addUser();
            console.log(created);
            res.send(created);
        }
    }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }

}

module.exports = {
    getAll,
    search,
    getUserByID,
    updateUser,
    remove,
    addUser,
}