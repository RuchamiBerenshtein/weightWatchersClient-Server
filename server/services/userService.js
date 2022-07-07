const fs = require('fs');

const data = fs.readFileSync('data/users.json');
const users = JSON.parse(data).users;

const saveToFile = async () => {
    const json = JSON.stringify({ 'users': users })
    await fs.writeFileSync('data/users.json', json, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

const getAll = async () => {
    console.log(users);
    return users;
}

const getById = async (id) => {
    id = parseInt(id)
    const user = users.find(user => user.id === id);
    return await user;
}

const addUser = async (user) => {
    
    users.push(user);
    saveToFile();
    return 'create';
}

const deleteUser = async (id) => {
    const index = await users.indexOf(user => user.id === id);
    users.splice(index, 1);
    saveToFile();
    return 'delete';
}

const updateUser = async (user) => {
    const index = users.indexOf(u => u.id === user.id);
    if (index === -1)
        return;

    users[index] = user;
    await saveToFile();
}

// export default {
//     getAll,
//     getById,
//     addUser,
//     deleteUser,
//     updateUser
// }

module.exports = {
    getAll,
    getById,
    addUser,
    deleteUser,
    updateUser
}
