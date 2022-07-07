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

const search = async (req, res) => {
}

const getUserByID = async (req, res) => {
    const id = parseInt(req.params.id);
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
    const {id} = parseInt(req.params);
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
        if (req.body.user) {
            const { user } = req.body;
        
            const created = await userService.addUser(user);
            console.log(created);
            res.send(created);
        }
        else {
            res.status(400).json({
                massage: `you have to send a user`
            })
        }
    }
    catch (err) {
        res.status(500).json({
            massage: `write to json was failed ${err}`
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