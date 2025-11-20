const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');

const authMiddleware = require('../middleware/auth.middleware');

// Register route
router.post('/register', authController.userRegister);

router.post('/login', authController.userLogin);

router.get('/logout', authMiddleware, authController.logout);

router.get('/check-auth', authMiddleware, authController.checkUser);


module.exports = router;