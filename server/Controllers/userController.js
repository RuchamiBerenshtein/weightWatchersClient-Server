const userService = require('../services/userService');

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(500).json({
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
    try{
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
    debugger
    const id = parseInt(req.params.id);

    try {
        const user = await userService.getById(id);
       res.send(user);
    }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { user } = req.body;

    if (id !== user.id) {
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

    userService.updateUser(user);
    res.status(200).json({
        massage: 'user is updated'
    })
}

const remove = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleteUser = await userService.deleteUser(id);
        res.status(200).json({
            massage: `user ${deleteUser + 1} was deleted`
        })

    }
    catch (err) {
        res.status(500).json({
            massage: `reading from json was failed ${err}`
        })
    }
}

const addUser = async (req, res) => {

    try {
        if (req.body.user) {
            const { user } = req.body;

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