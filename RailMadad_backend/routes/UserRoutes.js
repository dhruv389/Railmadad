const express = require('express');
const {  Adminlogin,Stafflogin , SendOtp , ValidateOtp ,  getAccount , deleteAccount , updateAccount , CreateAccount} = require('../controllers/userController');

const router = express.Router();
const { ComplaintsauthMiddleware } = require('../middlewares/AuthMiddleware');

// router.get('/:id', getUser);
// router.post('/', createUser);
router.post('/getadmin', Adminlogin);
router.post('/getstaff', Stafflogin);
router.post('/sendotp', SendOtp);
router.post('/validateotp', ValidateOtp);

router.post('/createnewaccount', ComplaintsauthMiddleware, CreateAccount);
router.delete('/deleteCreatedAccounts/:id', ComplaintsauthMiddleware, deleteAccount);
router.put('/updatecreatedAccounts/:id', ComplaintsauthMiddleware, updateAccount);

router.get('/getcreatedaccounts', ComplaintsauthMiddleware, getAccount);





module.exports = router; 