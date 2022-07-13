const fs = require('fs');
const jsonData = fs.readFileSync('data/users.json');
const data = JSON.parse(jsonData);

const login = async (email) => {

    return await newFunction();

    async function newFunction() {
        const user = await data.users.find(user => user.email === email);

        return await user;
    }
}

module.exports ={login} 