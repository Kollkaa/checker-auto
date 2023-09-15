const express = require('express');
const router = express.Router();
const language = require('../../services/variable/language');
// const deleteUser = require('./delete_user.js');
// const updateUser = require('./update_user.js');

router.get(`/language/`, language.getLanguage);
router.post(`/language/`, language.createLanguage);
router.delete(`/language/:id`, language.deleteLanguage);
router.put(`/language/:id`, language.updateLanguage);

module.exports = router;

