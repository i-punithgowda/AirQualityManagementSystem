import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

function ZoneAdd() {
  const [ZoneId, setZoneId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const baseURL = process.env.REACT_APP_API;

  const handleSave = async () => {
    if (ZoneId !== "" && latitude !== "" && longitude !== "" && description !== "") {
      console.log(ZoneId, latitude, longitude, description);
      try {
        const { data } = await axios.post(`${baseURL}insert-zone-info`, {
          ZoneId: ZoneId,
          Latitude: latitude,
          Longitude: longitude,
          Description: description,
        });

        setZoneId("");
        setLatitude("");
        setLongitude("");
        setDescription("");
        alert(data.message);
      } catch (err) {
        if (err.response.data) {
          alert(err.response.data.message);
        } else {
        }
      }
    } else {
      alert("Enter all fields");
    }
  };

  return (
    <Box className="h-screen overflow-hidden">
      <DashboardLayout>
        <DashboardNavbar />
        <Box className="w-12/12 h-screen  flex justify-center items-center ">
          <Box
            sx={{ backgroundColor: "gainsboro" }}
            className=" w-8/12 h-6/6 overflow-hidden p-5 rounded-2xl"
          >
            <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "black" }}>
              Save Zone Information
            </Typography>

            <Box component="form" role="form" sx={{ paddingX: 5 }}>
              <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Box width="50%" mb={2}>
                  <Typography variant="button" color="black" fontWeight="medium">
                    Zone ID
                  </Typography>
                  <TextField
                    type="text"
                    placeholder="Zone ID"
                    value={ZoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "transparent",
                        borderRadius: 0,
                        borderColor: "transparent",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  />
                </Box>
                <Box width="50%" mb={2}>
                  <Typography variant="button" fontWeight="medium" color="black">
                    Latitude
                  </Typography>
                  <TextField
                    type="text"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "transparent",
                        borderRadius: 0,
                        borderColor: "transparent",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  />
                </Box>
                <Box width="50%" mb={2}>
                  <Typography variant="button" fontWeight="medium" color="black">
                    Description
                  </Typography>
                  <TextField
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "transparent",
                        borderRadius: 0,
                        borderColor: "transparent",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  />
                </Box>
                <Box width="50%">
                  <Typography variant="button" color="black" fontWeight="medium">
                    Longitude
                  </Typography>
                  <TextField
                    type="text"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "transparent",
                        borderRadius: 0,
                        borderColor: "transparent",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box mt={4} mb={1} className="flex justify-center items-center">
                <Button variant="outlined" color="secondary" onClick={handleSave}>
                  <span className="text-black">Save</span>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    </Box>
  );
}

export default ZoneAdd;
