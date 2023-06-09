import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import CoverLayout from "layouts/authentication/components/CoverLayout";

import bgSignIn from "assets/images/pollution.jpg";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { Box } from "@mui/material";
import { useVisionUIController, setLayout } from "context";

function Home() {
  const [controller, dispatch] = useVisionUIController();
  useEffect(() => {
    setLayout(dispatch, "page");
  }, []);

  {
    /*
return (
    <Box
      sx={{
        backgroundColor: "#0A0D2F",
        color: "#fff",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}
      className="h-screen w-screen"
    >
      <DefaultNavbar color="white" />
      <Box sx={{ marginTop: "100px" }}>asdds</Box>
    </Box>
  );
*/
  }

  return (
    <CoverLayout
      title="Air Quality Management System"
      color="white"
      description="<Hack-n-Lead>"
      premotto="Department of MCA"
      motto="RV College of Engineering"
      image={bgSignIn}
    ></CoverLayout>
  );
}

export default Home;
