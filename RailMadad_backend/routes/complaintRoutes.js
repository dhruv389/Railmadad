const express = require('express');
const { createEnqury , getEnqury,  getComplaintByCategory , getComplaintByUser,getAllStationComplaint } = require('../controllers/Complaints');

const router = express.Router();

// router.get('/:id', getUser);
// router.post('/', createUser);
// router.post('/check', check);
router.post('/create', createEnqury);
router.get('/getdata', getEnqury);
router.get('/Categories/:category', getComplaintByCategory); // all category complain
router.get('/User/:user', getComplaintByUser); //all user complain 
router.get('/Station/:station', getAllStationComplaint); //all user complain 

module.exports = router; 