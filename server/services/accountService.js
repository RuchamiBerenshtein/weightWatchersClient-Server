const fs = require('fs');
const jsonData = fs.readFileSync('data/users.json');
const data = JSON.parse(jsonData);
const users = data.users;
const admin= data.admin;


const login = async (email) => {
    let user = users.find(user => user.details.email === email);
    if (!user) {
            user = admin;
    }
    return user;
}

module.exports = { login } 