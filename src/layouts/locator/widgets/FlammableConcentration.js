import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { IoHappy } from "react-icons/io5";
import colors from "assets/theme/base/colors";
import linearGradient from "assets/theme/functions/linearGradient";
import CircularProgress from "@mui/material/CircularProgress";

const FlammableConcentration = ({ concentrationValue, zone }) => {
  const { info, gradients } = colors;
  const { cardContent } = gradients;
  const [threshold, setTheshold] = useState(0.34);

  useEffect(() => {
    if (concentrationValue > 1000) {
      setTheshold(1);
    } else if (concentrationValue > 700) {
      setTheshold(0.9);
    } else if (concentrationValue > 600) {
      setTheshold(0.75);
    } else if (concentrationValue > 400) {
      setTheshold(0.34);
    } else if (concentrationValue > 300) {
      setTheshold(0.22);
    } else {
      setTheshold(0.15);
    }
  }, []);

  return (
    <Card sx={{ height: "340px" }}>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="4px">
          Flammable Concentration
        </VuiTypography>
        <VuiTypography variant="button" color="text" fontWeight="regular" mb="20px">
          current Flammable Concentration at {zone}
        </VuiTypography>
        <VuiBox sx={{ alignSelf: "center", justifySelf: "center", zIndex: "-1" }}>
          <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
            <GaugeChart id="gauge-chart1" percent={threshold} />

            <VuiBox
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></VuiBox>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default FlammableConcentration;
