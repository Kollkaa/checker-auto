const express = require('express');
const router = express.Router();
const user = require('../services/user');
// const deleteUser = require('./delete_user.js');
// const updateUser = require('./update_user.js');

router.get(`/`, user.getUser);
router.post(`/`, user.createUser);
router.delete(`/:id`, user.deleteUser);
router.put(`/:id`, user.updateUser);

module.exports = router;

