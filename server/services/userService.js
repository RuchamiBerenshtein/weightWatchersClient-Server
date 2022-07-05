const fs = require('fs');
const data = fs.readFileSync('data/users.json');
const users = JSON.parse(data).users;

const getAll = async () => {
    return await users;
}

const getById = (id) => {
    const user = users.find(user => user.id === id);
    return user;
}

module.exports = {
    getAll,
    getById,

}
