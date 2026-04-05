const express = require('express');
const router = express.Router();
const generationController = require('../controllers/generationController');

// La route POST pour lancer l'algorithme
router.post('/generer', generationController.genererEDTGlouton);

module.exports = router;