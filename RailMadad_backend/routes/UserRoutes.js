const express = require('express');
const {  Adminlogin,Stafflogin } = require('../controllers/userController');

const router = express.Router();

// router.get('/:id', getUser);
// router.post('/', createUser);
router.post('/getadmin', Adminlogin);
router.post('/getstaff', Stafflogin);



module.exports = router; 