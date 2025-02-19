const express = require('express');
const router = express.Router();
const CaveController = require('../controllers/CaveController');

router.get('/caves', CaveController.getAllCaves);
router.get('/caves/:id', CaveController.getCaveById);
router.get('/caves/:id/model', CaveController.getCave3DModel);

module.exports = router; 