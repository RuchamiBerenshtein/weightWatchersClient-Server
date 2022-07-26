const express= require('express');
const router= express.Router();
const userController= require('../Controllers/userController')

router.get('/', userController.getAll);

router.get('/search', userController.search);

router.get('/:email', userController.getUserByEmail);

router.put('/:id', userController.updateUser);

router.delete('/:id',userController.remove )

router.post('/',userController.addUser );

module.exports= router;