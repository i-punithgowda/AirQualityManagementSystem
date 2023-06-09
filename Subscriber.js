var mqtt = require("mqtt");
const express = require("express");
const mysql = require("mysql");

const dbConfig = {
  host: "192.46.211.177",
  user: "zone",
  password: "Zone@123",
  database: "zoneairquality",
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// set the broker URL and credentials
var brokerUrl = "mqtt://192.46.211.177:1884";
var options = {
  clientId: "sub_zone_1",
  username: "user1",
  password: "password1",
};

// set the topic
var topic = "v1/zone/me/telemetry";

// connect to the MQTT broker with credentials
var client = mqtt.connect(brokerUrl, options);

client.on("connect", () => {
  client.subscribe(topic, (err) => {
    if (err) {
      console.log("Failed to subscribe to topic:", err);
      return;
    }
    console.log("Subscribed to topic:", topic);
  });
});

client.on("message", (topic, message) => {
  //  console.log("Received message:", message.toString());
  var data = JSON.parse(message.toString());

  console.log(insertData(data));
});

function insertData(data) {
  //console.log(data);
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      return "db connection refused";
    }

    //fetch current time
    const currentDatetime = new Date();
    currentDatetime.setHours(currentDatetime.getHours() + 5);
    currentDatetime.setMinutes(currentDatetime.getMinutes() + 30);
    const formattedDatetime = currentDatetime.toISOString().slice(0, 19).replace("T", " ");

    // Prepare the SQL query
    const query =
      "INSERT INTO devicedata (ZoneId,Temperature,Humidity,RainLevel,FlammableConcentration,AirQuality,timestamp) VALUES (?,?,?,?,?,?,?)";
    const values = [
      data.ZoneId,
      data.Temperature,
      data.Humidity,
      data.RainLevel,
      data.FlammableConcentration,
      data.AirQuality,
      formattedDatetime,
    ];

    // Execute the query
    connection.query(query, values, (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        return "connection refused";
      } else {
        console.log("Data inserted into the table:", values);
        return "Data inserted";
      }
    });
  });
  return "";
}
