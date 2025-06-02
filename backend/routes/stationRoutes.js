const express = require('express');
const {
  getAllStations,
  createStation,
  updateStation,
  deleteStation
} = require('../controllers/stationController');

const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getAllStations)
  .post(protect, createStation);

router.route('/:id')
  .put(protect, updateStation)
  .delete(protect, deleteStation);

module.exports = router;
