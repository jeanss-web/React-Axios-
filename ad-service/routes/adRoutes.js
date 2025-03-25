const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

router.post('/ads', adController.createAd);
router.get('/ads', adController.getAllAds);
router.get('/ads/:id', adController.getAdById);
router.put('/ads/:id', adController.updateAd);
router.delete('/ads/:id', adController.deleteAd);

module.exports = router;