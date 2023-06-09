// @mui material components
import Tooltip from "@mui/material/Tooltip";

export default function data() {
  const rows = [
    {
      Zone: "Zone 1",
      Temperature: 25,
      Humidity: 65,
      RainLevel: 2,
      "Flammable Concentration": 12,
      "Air Quality": 80,
    },
    {
      Zone: "Zone 2",
      Temperature: 28,
      Humidity: 70,
      RainLevel: 0,
      "Flammable Concentration": 8,
      "Air Quality": 85,
    },
    {
      Zone: "Zone 3",
      Temperature: 22,
      Humidity: 60,
      RainLevel: 5,
      "Flammable Concentration": 15,
      "Air Quality": 75,
    },
    // Add more rows as needed
  ];

  return {
    columns: [
      { name: "Zone", align: "left" },
      { name: "Temperature", align: "left" },
      { name: "Humidity", align: "center" },
      { name: "RainLevel", align: "center" },
      { name: "Flammable Concentration", align: "center" },
      { name: "Air Quality", align: "center" },
    ],

    rows: rows,
  };
}
