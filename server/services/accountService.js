const fs = require('fs');
const jsonData = fs.readFileSync('data/users.json');
const users = JSON.parse(jsonData).users;

const login = async (email) => {

    const user =await users.find(user => (user.details).email === email);
    console.log(user);
    return await user;
}

module.exports ={login} 