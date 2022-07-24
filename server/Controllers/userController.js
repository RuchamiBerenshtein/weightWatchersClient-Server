const userService = require('../services/userService');
const userModel = require('../models/userModel')


const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.send(users)
    }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
};

const search = async (req, res) => {
    try {
        if (req.query.minBMI) {
            const { minBMI, maxBMI } = req.query;
            const filterUsers = await userService.searchBMI(minBMI, maxBMI);
            res.status(200).json({
                filterUsers
            })

        }
        else {
            const { text } = req.query;
            const filterUsers = await userService.searchByFreeText(text);
            res.status(200).json({
                filterUsers
            })
        }

    }
    catch {
        res.status(500).json({
            massage: 'filter users was filed'
        })
    }
}

const getUserByID = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await userService.getById(id);
        res.send(user);
    }
    catch (err) {
        if (err.message === 'No user not found with given id')
            res.status(00).json({
                err
            })

        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { details } = req.body;

    userService.updateUser(details, id);
    res.status(200).json({
        massage: 'user is updated'
    })
}

const remove = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleteUser = await userService.deleteUser(id);
        res.send(deleteUser);

    }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
}

const addUser = async (req, res) => {

    try {
        if (req.body) {
            const { id, details } = req.body;
            let user = new userModel({
                id,
                details
            });

            const created = await userService.addUser(user);

            res.status(200).json({
                massage: `user created successfully! user id is: ${created}`
            })
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