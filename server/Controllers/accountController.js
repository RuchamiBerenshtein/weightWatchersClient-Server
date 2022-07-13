const accountService = require('../services/accountService');


module.exports.addAccount = async function (req, res) {

    try {
        const { email } = req.body;
        let data = {
            email
        }
        const user = await accountService.login(data);
        res.send(user);
    }
    catch (error) {
        res.status(500).json({
            massage: `${error}`
        })
    }
}


