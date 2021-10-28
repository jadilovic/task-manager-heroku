const express = require('express');
const router = express.Router();

const { signup, login, getAllUsers } = require('../controllers/auth');

router.post('/login', login);
router.post('/signup', signup);
router.get('/allusers', getAllUsers);

module.exports = router;
