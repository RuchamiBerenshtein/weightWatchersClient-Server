const userService = require('../services/userService').default;

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
}
const addUser = async (req, res) => {
}


module.exports = {
    getAll,
    search,
    getUserByID,
    updateUser,
    remove,
    addUser,
}