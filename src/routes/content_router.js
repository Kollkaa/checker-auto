const express = require('express');
const content = require('../services/content');
const router = express.Router();



router.get('/',content.getContent);
router.get('/:id',content.getContentById);
router.post('/:id',content.createContent);
router.delete('/:id',content.deleteContentById);
router.put('/:id',content.updateContentById);



module.exports =router