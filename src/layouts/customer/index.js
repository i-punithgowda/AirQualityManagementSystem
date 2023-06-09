import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useVisionUIController, setLayout } from "context";
import CustomerSidenav from "examples/CustomerSideNav";
import ZoneDataCustomer from "./ZonedataCustomer";
import { useParams } from "react-router-dom";
import axios from "axios";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
function Customer() {
  const [controller, dispatch] = useVisionUIController();

  const [currState, setCurrState] = useState("zone");
  const [zone, setZone] = useState("");
  const params = useParams();
  const { email } = params;
  const baseAPI = process.env.REACT_APP_API;

  const fetchCustomerZone = async () => {
    try {
      const { data } = await axios.post(`${baseAPI}get-zone-by-emailID`, {
        emailId: email,
      });
      console.log(data);
      setZone(data.ZoneId);
    } catch (err) {
      alert(err.response.data ? err.response.data.message : "Something went wrong");
    }
  };

  useEffect(() => {
    setLayout(dispatch, "page");
    fetchCustomerZone();
  }, []);
  return (
    <Box
      sx={{
        height: "980px",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomerSidenav setCurrState={setCurrState} currState={currState} />
      {currState == "zone" ? (
        <Box sx={{ width: "80%" }}>
          <ZoneDataCustomer selectedZone={zone} />
        </Box>
      ) : (
        "prediction"
      )}
    </Box>
  );
}

export default Customer;
