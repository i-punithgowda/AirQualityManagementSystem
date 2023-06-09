import React, { useState, useEffect } from "react";
import Temperature from "./widgets/Temperature";
import Humidity from "./widgets/Humidity";
import Rain from "./widgets/Rain";
import FlammableConcentration from "./widgets/FlammableConcentration";
import AirQuality from "./widgets/AirQuality";
import VuiBox from "components/VuiBox";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Box } from "@mui/material";
import { useHistory } from "react-router-dom";

function ZoneDataCustomer({ selectedZone, type = "user" }) {
  const history = useHistory();
  const goBack = () => {
    history.push("/");
  };

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [rainLevel, setRainLevel] = useState(0);
  const [flammableConcentration, setFlammableConcentration] = useState(0);
  const [airQuality, setAirQuality] = useState(0);

  const baseURL = process.env.REACT_APP_API;

  const fetchLiveSensorData = async () => {
    try {
      const { data } = await axios.post(`${baseURL}get-live-by-zone`, {
        ZoneId: selectedZone,
      });

      console.log(data);
      setTemperature(data[0] ? data[0].Temperature : 0);
      setHumidity(data[0] ? data[0].Humidity : 0);
      setRainLevel(data[0] ? data[0].RainLevel : null);
      setFlammableConcentration(data[0] ? data[0].FlammableConcentration : null);
      setAirQuality(data[0] ? data[0].AirQuality : null);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    setInterval(fetchLiveSensorData, 3000);
  }, [selectedZone]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center  text-white ">Real time Zone Information</h1>
      <Box className="flex flex-col w-full justify-center items-center">
        <h3 className="text-xl text-center  text-warning my-3 font-bold text-light">
          {selectedZone}
        </h3>
        {type == "user" ? (
          <button className="btn btn-outline btn-warning" onClick={goBack}>
            Logout
          </button>
        ) : null}
      </Box>

      <VuiBox mb={3} className="my-5">
        <Grid container spacing="18px">
          <Grid item xs={12} lg={12} xl={5}>
            {temperature ? <Temperature temperature={temperature} zone={selectedZone} /> : null}
          </Grid>
          <Grid item xs={12} lg={6} xl={3}>
            {humidity ? <Humidity humidity={humidity} zone={selectedZone} /> : null}
          </Grid>
          <Grid item xs={12} lg={6} xl={4}>
            <Rain zone={selectedZone} rain={rainLevel} />
          </Grid>
        </Grid>
      </VuiBox>

      <VuiBox mb={3} className="my-5 ">
        <Grid container spacing="18px" justifyContent="center">
          <Grid item xs={12} lg={6} xl={3}>
            {airQuality ? <AirQuality airquality={airQuality} zone={selectedZone} /> : null}
          </Grid>
          <Grid item xs={12} lg={12} xl={5}>
            {flammableConcentration ? (
              <FlammableConcentration
                concentrationValue={flammableConcentration}
                zone={selectedZone}
              />
            ) : null}
          </Grid>
        </Grid>
      </VuiBox>
    </div>
  );
}

export default ZoneDataCustomer;
