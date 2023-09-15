const express = require('express');
const component = require('../services/component');
const router = express.Router();

router.get('/',component.getComponent);
router.get('/:id',component.getComponentById);
router.post('/:id',component.createComponent);
router.delete('/:id',component.deleteComponentById);
router.put('/:id',component.updateComponentById);

module.exports = router