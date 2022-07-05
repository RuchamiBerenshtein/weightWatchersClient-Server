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

getUserByID = async function (req, res) {
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

updateUser = async function (req, res) {
}

remove = async function (req, res) {
}

addUser = async function (req, res) {
}


module.exports = {
    getAll,
    search,
    getUserByID,
    updateUser,
    remove,
    addUser,
}