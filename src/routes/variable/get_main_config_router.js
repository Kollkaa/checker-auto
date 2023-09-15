const express = require('express');
const router = express.Router();
const main_config = require('../../services/variable/main_config');
// const deleteUser = require('./delete_user.js');
// const updateUser = require('./update_user.js');

router.get(`/main_config/`, main_config.getRotation);

module.exports = router;

