const accountService = require('../services/accountService');


module.exports.addAccount = async function (req, res) {

    try {
        const { email } = req.body;
        
        const user = await accountService.login(email);

        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({
            massage: `${error}`
        })
    }
}


