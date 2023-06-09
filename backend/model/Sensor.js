const db = require("../config/db");

const Sensor = {};

Sensor.getAllZones = () => {
  return new Promise((resolve, reject) => {
    db.query(`select * from zonedevice`, (err, results) => {
      if (err) {
        reject({ status: false, message: err });
      } else {
        resolve(results);
      }
    });
  });
};

Sensor.liveData = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    db.query(
      `select * from devicedata  where ZoneId='${data.ZoneId}' ORDER BY timestamp DESC LIMIT 1`,
      (err, results) => {
        if (err) {
          reject({ status: false, message: err });
        } else {
          resolve(results);
        }
      }
    );
  });
};

Sensor.saveZoneInfo = (data) => {
  return new Promise((resolve, reject) => {
    // Check if ZoneId already exists in the table
    db.query(`SELECT ZoneId FROM zonedevice WHERE ZoneId = '${data.ZoneId}'`, (err, results) => {
      if (err) {
        reject({ status: false, message: err });
      } else if (results.length > 0) {
        reject({ status: false, message: "ZoneId already exists!" });
      } else {
        // Insert the data into the table
        db.query(
          `INSERT INTO zonedevice (ZoneId, Latitude, Longitude, Description) VALUES ('${data.ZoneId}', '${data.Latitude}', '${data.Longitude}', '${data.Description}')`,
          (err, results) => {
            if (err) {
              reject({ status: false, message: err });
            } else {
              resolve({ status: true, message: "Zone Information Saved!" });
            }
          }
        );
      }
    });
  });
};

Sensor.fetchRecentDeviceData = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *
       FROM devicedata
       ORDER BY timestamp DESC
       LIMIT 20`,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

Sensor.getZoneByTelegramId = (data) => {
  console.log(data, data);
  return new Promise((resolve, reject) => {
    db.query(`select ZoneId from customer where telegramId='${data}'`, (err, results) => {
      if (err) {
        reject({ status: false, message: err });
      } else {
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve({ status: false, message: "Invalid TelegramId" });
        }
      }
    });
  });
};

Sensor.getZoneByEmail = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    db.query(`select ZoneId from customer where email='${data}'`, (err, results) => {
      if (err) {
        reject({ status: false, message: err });
      } else {
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve({ status: false, message: "Invalid Email ID" });
        }
      }
    });
  });
};

Sensor.getAirQualityData = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `
      SELECT
  DATE_FORMAT(CONVERT_TZ(timestamp, '+00:00', '+05:00'), '%h %p') AS hour,
  ZoneId,
  AVG(AirQuality) AS average_air_quality
FROM devicedata
GROUP BY hour, ZoneId
ORDER BY hour, ZoneId;

    `,
      (err, results) => {
        if (err) {
          reject({ status: false, message: err });
        } else {
          const zone1Data = results.filter((item, index) => item.ZoneId === "zone_1");
          const zone2Data = results.filter((item, index) => item.ZoneId === "zone_2");

          resolve({ zone1Data, zone2Data });
        }
      }
    );
  });
};

Sensor.temperatureHumidity = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `
      SELECT
  DATE_FORMAT(CONVERT_TZ(timestamp, '+00:00', '+05:00'), '%h %p') AS hour,
  ZoneId,
  AVG(temperature) AS average_temperature,
  AVG(humidity) AS average_humidity
FROM devicedata
GROUP BY hour, ZoneId
ORDER BY hour, ZoneId;


    `,
      (err, results) => {
        if (err) {
          reject({ status: false, message: err });
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = Sensor;
