<<<<<<< HEAD
const userService = require('../services/userService').default;
=======
const { response } = require('express');
const userService = require('../services/userService');
>>>>>>> 679bfa6247eb0ad1e57463b64b50e6eaf96669c2

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
const search = async (req, res) => {
}
<<<<<<< HEAD
const getUserByID = async (req, res) => {
    const id = parseInt(req.params.id);
=======

const getUserByID = async function (req, res) {
    const id = req.params.id;
>>>>>>> 679bfa6247eb0ad1e57463b64b50e6eaf96669c2
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
<<<<<<< HEAD
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { upUser } = req.body;

    if (id !== upUser.id) {
        res.status(400).json({
            massage: 'there is not a same user'
        });
    }

    const existingUser = userService.getById(id);
    if (!existingUser) {
        res.status(400).json({
            massage: 'user is not find'
        })
    }

    userService.updateUser(upUser);
    res.status(200).json({
        massage: 'user is updated'
    })
}
const remove = async (req, res) => {
}
const addUser = async (req, res) => {
}
=======
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
>>>>>>> 679bfa6247eb0ad1e57463b64b50e6eaf96669c2

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