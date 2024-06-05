const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/', locationController.receiveLocationData);
router.get('/', locationController.getAllLocations);
router.get('/behavioral-data', locationController.getBehavioralData);

module.exports = router;
