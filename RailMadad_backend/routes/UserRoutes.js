const express = require('express');
const { getUser, createUser,login,register,check } = require('../controllers/userController');

const router = express.Router();

// router.get('/:id', getUser);
// router.post('/', createUser);
router.post('/check', check);
router.post('/login', login);
router.post('/register', register);


module.exports = router; 