const fs = require('fs');
const data = fs.readFileSync('data/users.json');
const users = JSON.parse(data).users;

const getAll = async () => {
    return await users;
}


const getById = async (id) => {
    id = parseInt(id)
    const user = users.find(user => user.id === id);
    return await user;
}
const addUser = async (user) => {
    users.push(user);
    const json = JSON.stringify({ 'users': users })
    await fs.writeFileSync('data/users.json', json);
    return 'create';
}

const deleteUser = async (id) => {
    const index = await users.findIndex(user => user.id === parseInt(id));
    await users.splice(index, 1);
    const json = JSON.stringify({ 'users': users })
    await fs.writeFileSync('data/users.json', json);
    return 'delete';
}
const updateUser = async (id, user) => {
    users = users.filter(user => user.id != parseInt(id));
    users.push(user);
    const json = JSON.stringify({ 'users': users })
    await fs.writeFileSync('data/users.json', json);

    return 'updateUser'
}

module.exports = {
    getAll,
    getById,
    addUser,
    deleteUser,
    updateUser
}
