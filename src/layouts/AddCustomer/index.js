import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Box, Typography, TextField, Button, Autocomplete } from "@mui/material";
import axios from "axios";

function AddCustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [password, setPassword] = useState("");

  const [zones, setZones] = useState([]);
  const baseURL = process.env.REACT_APP_API;

  const handleZoneChange = (event, newValue) => {
    setZoneId(newValue);
  };

  const handleSave = async () => {
    if (name !== "" && email !== "" && phone !== "" && zoneId !== "") {
      console.log(name, email, phone, zoneId);
      try {
        const { data } = await axios.post(`${baseURL}insert-customer`, {
          name: name,
          email: email,
          phone: phone,
          ZoneId: zoneId,
        });
        alert(data.message);
        setName("");
        setEmail("");
        setPhone("");
        setZoneId("");
      } catch (err) {
        if (err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      alert("Enter all fields");
    }
  };

  useEffect(() => {
    // Fetch zone values from API
    const fetchZones = async () => {
      try {
        const { data } = await axios.get(`${baseURL}get-zones`);
        setZones(data.map((zone) => zone.ZoneId));
      } catch (err) {
        console.log(err);
        // Handle error scenario
      }
    };

    fetchZones();
  }, []);

  return (
    <Box className="h-screen overflow-hidden">
      <DashboardLayout>
        <DashboardNavbar />
        <Box className="w-12/12 h-screen  flex justify-center items-center ">
          <Box
            sx={{ backgroundColor: "gainsboro" }}
            className=" w-10/12 h-6/6 overflow-hidden p-5 rounded-2xl"
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ mt: 3, mb: 2, fontWeight: "bold", color: "black" }}
            >
              Save Customer Information
            </Typography>

            <Box component="form" role="form" sx={{ paddingX: 5 }}>
              <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Box width="50%" mb={2}>
                  <Typography variant="button" color="black" fontWeight="medium">
                    Name
                  </Typography>
                  <TextField
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    Email
                  </Typography>
                  <TextField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    Phone
                  </Typography>
                  <TextField
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    Zone ID
                  </Typography>
                  <Autocomplete
                    value={zoneId}
                    onChange={handleZoneChange}
                    options={zones}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            background: "transparent",
                            borderRadius: 0,
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                          },
                        }}
                      />
                    )}
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

export default AddCustomer;
