const accountService = require('../services/accountService');

module.exports.addAccount = async function (req, res) {
    
    try {
        const { email } = req.body;
        let data = {
            email
        }
        const user = await accountService.login();
        res.send(user);
    }
    catch (error) {
        next(error)
    } 

}