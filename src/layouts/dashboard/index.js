import React, { useState, useEffect } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Box, Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components

import Projects from "layouts/dashboard/components/Projects";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";

function Dashboard() {
  const [airQualityData, setAirQualityData] = useState([]);
  const [tempHumData, setTempHumData] = useState([]);
  const [allTimes, setAllTimes] = useState([]);
  const [allTimesTemp, setAllTimesTemp] = useState([]);

  const { gradients } = colors;
  const { cardContent } = gradients;
  const baseURL = process.env.REACT_APP_API;

  const fetchAirQuality = async () => {
    try {
      const { data } = await axios.get(`${baseURL}get-air-quality-data`);
      console.log("jejeje", data);
      // Extract zone1Data and zone2Data from the response
      const { zone1Data, zone2Data } = data;

      // Create an array for average_air_quality values
      const zone1AirQuality = zone1Data.map((item) => parseFloat(item.average_air_quality));
      const zone2AirQuality = zone2Data.map((item) => parseFloat(item.average_air_quality));

      const mergedAirQuality = zone1AirQuality.concat(zone2AirQuality);

      const timeArray = [];

      data.zone1Data.forEach((item) => {
        timeArray.push(item.hour);
      });

      data.zone2Data.forEach((item) => {
        timeArray.push(item.hour);
      });
      setAllTimes(timeArray);

      // Create the final data structure in the desired format
      const chartData = [{ name: "PPM", data: mergedAirQuality }];

      setAirQualityData(chartData);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const fetchTemperatureAndHumidity = async () => {
    try {
      const { data } = await axios.get(`${baseURL}get-temp-humidity-data`);
      console.log("h", data);

      const val = [
        {
          name: "Temperature",
          data: [],
        },
        {
          name: "Humidity",
          data: [],
        },
      ];

      for (const item of data) {
        const { hour, ZoneId, average_temperature, average_humidity } = item;

        val[0].data.push(Math.round(average_temperature));

        val[1].data.push(Math.round(average_humidity));
      }

      const timeArray = data.map((item) => item.hour);
      setAllTimesTemp(timeArray);

      console.log(val);

      setTempHumData(val);

      console.log(lineChartDataDashboard);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchTemperatureAndHumidity();
    fetchAirQuality();
  }, []);

  const barChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "10px",
        fontFamily: "Plus Jakarta Display",
      },
      onDatasetHover: {
        style: {
          fontSize: "10px",
          fontFamily: "Plus Jakarta Display",
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: allTimes ? allTimes : null,
      show: true,
      labels: {
        show: false,
        style: {
          colors: "#fff",
          fontSize: "10px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      color: "#fff",
      labels: {
        show: true,
        style: {
          colors: "#fff",
          fontSize: "10px",
          fontFamily: "Plus Jakarta Display",
        },
      },
    },
    grid: {
      show: false,
    },
    fill: {
      colors: "#fff",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "12px",
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
            },
          },
        },
      },
    ],
  };

  const lineChartOptionsDashboard = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: allTimesTemp ? allTimesTemp : null,
      labels: {
        show: false,
        style: {
          colors: "#c8cfca",
          fontSize: "10px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "10px",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
      borderColor: "#56577A",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#0075FF", "#2CD9FF"],
    },
    colors: ["#0075FF", "#2CD9FF"],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ height: "860px", overflow: "hidden" }}>
        <VuiBox py={3}>
          <VuiBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6} xl={7}>
                <Card>
                  <VuiBox sx={{ height: "100%" }}>
                    <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                      Sensor values comparison
                    </VuiTypography>
                    <VuiBox display="flex" alignItems="center" mb="40px">
                      <VuiTypography variant="button" color="success" fontWeight="bold">
                        Temperature & Humidity
                        <VuiTypography
                          variant="button"
                          color="text"
                          fontWeight="regular"
                        ></VuiTypography>
                      </VuiTypography>
                    </VuiBox>
                    <VuiBox sx={{ height: "260px" }}>
                      {tempHumData.length > 0 ? (
                        <LineChart
                          lineChartData={tempHumData}
                          lineChartOptions={lineChartOptionsDashboard}
                        />
                      ) : null}
                    </VuiBox>
                  </VuiBox>
                </Card>
              </Grid>
              <Grid item xs={12} lg={6} xl={5}>
                <Card>
                  <VuiBox>
                    <VuiBox
                      mb="36px"
                      height="220px"
                      sx={{
                        background: linearGradient(
                          cardContent.main,
                          cardContent.state,
                          cardContent.deg
                        ),
                        borderRadius: "20px",
                      }}
                    >
                      {airQualityData.length > 0 ? (
                        <BarChart barChartData={airQualityData} barChartOptions={barChartOptions} />
                      ) : null}
                    </VuiBox>
                    <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                      PPM
                    </VuiTypography>
                    <VuiBox display="flex" alignItems="center" mb="40px">
                      <VuiTypography variant="button" color="success" fontWeight="bold">
                        Air Quality Values in PPM
                        <VuiTypography
                          variant="button"
                          color="text"
                          fontWeight="regular"
                        ></VuiTypography>
                      </VuiTypography>
                    </VuiBox>
                  </VuiBox>
                </Card>
              </Grid>
            </Grid>
          </VuiBox>
          <Box sx={{ height: "500px", overflow: "scroll" }}>
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item xs={12} md={6} lg={12}>
                <Projects />{" "}
              </Grid>
            </Grid>
          </Box>
        </VuiBox>
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard;
