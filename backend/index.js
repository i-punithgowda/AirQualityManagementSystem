const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

const AuthHandler = require("./controller/AuthHandler");
const SensorHandler = require("./controller/SensorHandler");

app.get("/", (req, res) => res.send("Api Working!!"));
app.post("/admin-login", AuthHandler.adminLogin);
app.post("/customer-login", AuthHandler.customerLogin);
app.post("/insert-customer", AuthHandler.insertCustomer);
app.post("/unsubscribe-telegram", AuthHandler.removeCustomerFromTelegram);

//sensor related routes

app.get("/get-zones", SensorHandler.getAllZones);
app.post("/get-live-by-zone", SensorHandler.sensorDataByZone);
app.post("/insert-zone-info", SensorHandler.saveZoneInfo);
app.get("/get-recent-devicedata", SensorHandler.fetchRecentDeviceData);
app.post("/get-zone-by-tid", SensorHandler.getZoneByTelegramId);
app.post("/get-zone-by-emailID", SensorHandler.getZoneByEmail);
app.get("/get-air-quality-data", SensorHandler.getAirQualityData);
app.get("/get-temp-humidity-data", SensorHandler.temperatureHumidity);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
