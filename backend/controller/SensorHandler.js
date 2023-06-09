const Sensor = require("../model/Sensor");

const SensorHandler = {
  getAllZones: async (req, res) => {
    try {
      const data = await Sensor.getAllZones();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  sensorDataByZone: async (req, res) => {
    try {
      const data = await Sensor.liveData(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  saveZoneInfo: async (req, res) => {
    try {
      const data = await Sensor.saveZoneInfo(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  fetchRecentDeviceData: async (req, res) => {
    try {
      const data = await Sensor.fetchRecentDeviceData();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getZoneByTelegramId: async (req, res) => {
    try {
      const data = await Sensor.getZoneByTelegramId(req.body.telegramId);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getZoneByEmail: async (req, res) => {
    try {
      const data = await Sensor.getZoneByEmail(req.body.emailId);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getAirQualityData: async (req, res) => {
    try {
      const data = await Sensor.getAirQualityData();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  temperatureHumidity: async (req, res) => {
    try {
      const data = await Sensor.temperatureHumidity();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
module.exports = SensorHandler;
