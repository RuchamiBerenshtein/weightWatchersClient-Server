const fs = require('fs');
const jsonData = fs.readFileSync('data/users.json');
const data = JSON.parse(jsonData);

const login = async (email) => {

    const user =await data.manager.find(user => user.email === email);
   if (!user){
    const user =await data.users.find(user => user.email === email);
    }
    return await user;
}

module.exports = login;