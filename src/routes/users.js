const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/account');

router.post('/registration', ctrlUser.user.userRegistration);
router.put('/reset-password', ctrlUser.user.resetPassword);
router.get('/getall', ctrlUser.user.getAll);

module.exports = router;
