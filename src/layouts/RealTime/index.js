import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import React, { useState, useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import ReactApexChart from "react-apexcharts";
import markerIcon from "../../assets/images/marker-icon.png";
import axios from "axios";
import { Box } from "@mui/material";
import useZoneFetch from "./useZoneFetch";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

function RealTime() {
  const [loading, setLoading] = useState(false);
  const [selectedZone, setSelectedZone] = useState("zone_1");

  const baseURL = process.env.REACT_APP_API;

  const { data, count } = useZoneFetch(`http://192.46.211.177:4001/get-live-by-zone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ZoneId: selectedZone }),
  });

  useEffect(() => {}, [selectedZone]);

  function get_y1_axis(y_val) {
    if (y1_axis.length < 6) {
      sety1_axis([...y1_axis, y_val]);
    } else {
      sety1_axis([...y1_axis.slice(1), y_val]);
    }
  }
  function get_y2_axis(y_val) {
    if (y2_axis.length < 6) {
      sety2_axis([...y2_axis, y_val]);
    } else {
      sety2_axis([...y2_axis.slice(1), y_val]);
    }
  }
  function get_y3_axis(y_val) {
    if (y3_axis.length < 6) {
      sety3_axis([...y3_axis, y_val]);
    } else {
      sety3_axis([...y3_axis.slice(1), y_val]);
    }
  }
  function get_y4_axis(y_val) {
    if (y4_axis.length < 6) {
      sety4_axis([...y4_axis, y_val]);
    } else {
      sety4_axis([...y4_axis.slice(1), y_val]);
    }
  }
  function get_y5_axis(y_val) {
    if (y5_axis.length < 6) {
      sety5_axis([...y5_axis, y_val]);
    } else {
      sety5_axis([...y5_axis.slice(1), y_val]);
    }
  }

  function GMT_TO_IST() {
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330; // IST offset UTC +5:30

    var ISTTime = new Date(currentTime.getTime() + ISTOffset * 60000);

    // Formatting the IST time as a string
    const formattedISTTime = ISTTime.toISOString();
    // console.log(formattedISTTime);
    return formattedISTTime;
  }

  function get_x_axis(x_val) {
    if (x_axis.length < 6) {
      setx_axis([...x_axis, x_val]);
    } else {
      setx_axis([...x_axis.slice(1), x_val]);
    }
  }
  // var cnt = 0;
  const [x_axis, setx_axis] = useState([]);
  const [y1_axis, sety1_axis] = useState([]);
  const [y2_axis, sety2_axis] = useState([]);
  const [y3_axis, sety3_axis] = useState([]);
  const [y4_axis, sety4_axis] = useState([]);
  const [y5_axis, sety5_axis] = useState([]);
  const [Volt_R, setVolt_R] = useState({
    series: [
      {
        name: "Temperature",
        data: y1_axis,
      },
      {
        name: "Humidity",
        data: y2_axis,
      },
      {
        name: "RainLevel",
        data: y3_axis,
      },
      {
        name: "FlammableConcentration",
        data: y4_axis,
      },
      {
        name: "AirQuality",
        data: y5_axis,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        animations: {
          enabled: false,
        },
      },
      markers: {
        size: 5,
        hover: {
          size: undefined,
          sizeOffset: 3,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: x_axis,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy HH:mm:ss",
        },
      },
    },
  });

  function getData1() {
    return {
      series: [
        {
          name: "Temperature",
          data: y1_axis,
        },
        {
          name: "Humidity",
          data: y2_axis,
        },
        {
          name: "RainLevel",
          data: y3_axis,
        },
        {
          name: "FlammableConcentration",
          data: y4_axis,
        },
        {
          name: "AirQuality",
          data: y5_axis,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          animations: {
            enabled: false,
          },
        },
        markers: {
          size: 5,
          hover: {
            size: undefined,
            sizeOffset: 3,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: x_axis,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy HH:mm:ss",
          },
        },
      },
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      get_x_axis(GMT_TO_IST());
      get_y1_axis(data.Temperature);
      get_y2_axis(data.Humidity);
      get_y3_axis(data.RainLevel);
      get_y4_axis(data.FlammableConcentration);
      get_y5_axis(data.AirQuality);
      setVolt_R((x) => getData1());
    }, 1000);
    return () => clearInterval(interval);
  }, [Volt_R]);

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Box sx={{ height: "980px", overflow: "hidden", width: "100%" }}>
        <DashboardLayout>
          <DashboardNavbar />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              height: "980px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "gainsboro",
                width: "80%",
                borderRadius: "20px",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div className="livechart">
                  <ReactApexChart
                    options={Volt_R.options}
                    series={Volt_R.series}
                    type="area"
                    height={600}
                    width={600}
                  />
                </div>
                <Box>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-purple-500 text-black border border-white p-2">
                      <strong className="">Temperature:</strong> {data && data.Temperature}
                    </div>
                    <div className="bg-purple-500 text-black border border-white p-2">
                      {" "}
                      <strong className="">Humidity:</strong> {data && data.Humidity}
                    </div>
                    <div className="bg-purple-500 text-black border border-white p-2">
                      {" "}
                      <strong className="">Rain Level:</strong> {data && data.RainLevel}
                    </div>
                    <div className="bg-purple-500 text-black border border-white p-2">
                      {" "}
                      <strong className="">Flammable Concentration:</strong>{" "}
                      {data && data.FlammableConcentration}
                    </div>
                    <div className="bg-purple-500 text-black border border-white p-2">
                      {" "}
                      <strong className="">Air Quality:</strong> {data && data.AirQuality}
                    </div>
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
        </DashboardLayout>
      </Box>
    );
  }
}

export default RealTime;
