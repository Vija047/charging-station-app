const ChargingStation = require('../models/ChargingStation')

// GET /api/stations?status=Active&connectorType=Type2 etc.
exports.getAllStations = async (req, res) => {
  try {
    const filters = req.query
    const stations = await ChargingStation.find(filters)
    res.status(200).json(stations)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stations', error: error.message })
  }
}

// POST /api/stations
exports.createStation = async (req, res) => {
  try {
    const { name, location, status, powerOutput, connectorType } = req.body

    if (!location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
      return res.status(400).json({ message: 'Invalid or missing location data' })
    }

    const station = await ChargingStation.create({
      name,
      location,
      status,
      powerOutput,
      connectorType
    })

    res.status(201).json(station)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create station', error: error.message })
  }
}

// PUT /api/stations/:id
exports.updateStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!station) {
      return res.status(404).json({ message: 'Station not found' })
    }

    res.status(200).json(station)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update station', error: error.message })
  }
}

// DELETE /api/stations/:id
exports.deleteStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndDelete(req.params.id)

    if (!station) {
      return res.status(404).json({ message: 'Station not found' })
    }

    res.status(200).json({ message: 'Station deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete station', error: error.message })
  }
}
