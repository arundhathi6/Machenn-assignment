const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const checkAuth = require('../middleware/checkAuth');

router.use(checkAuth);

router.get('/users', adminController.getUsers);
router.patch('/users/:userId', adminController.updateUser);
router.get('/users/:userId', adminController.getUserById);
router.delete('/users/:userId', adminController.deleteUser);
router.patch('/reset-password/:userId', adminController.resetPassword);

module.exports = router;


