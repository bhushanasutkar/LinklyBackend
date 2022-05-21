/* eslint-disable prettier/prettier */
const express = require('express');
const usercontroller = require('../../controllers/user.controller');

const router = express.Router();

// for creating the user->Working
router.post('/createuser', usercontroller.usersignup);

// for user login
router.post('/login', usercontroller.userlogin);

module.exports = router;
