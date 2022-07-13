const fs = require('fs');
const jsonData = fs.readFileSync('data/users.json');
const data = JSON.parse(jsonData);

const login = async (email) => {
    let user = data.users.find(user => user.details.email === email);
    if (!user) {
        if (data.admin.details.email == email)
            user = data.admin;
    }
    return user;
}

module.exports = { login } 