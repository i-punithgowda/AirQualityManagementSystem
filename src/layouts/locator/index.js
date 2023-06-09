import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ZoneData from "./ZoneData";
import React, { useState, useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import markerIcon from "../../assets/images/marker-icon.png";
import axios from "axios";

function Locator() {
  const [mapActive, setMapActive] = useState(true);
  const [selectedZone, setSelectedZone] = useState("");
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = process.env.REACT_APP_API;

  const getAllZones = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseURL}get-zones`);

      const tempArray = [];

      data.forEach((val) => {
        console.log(val.Latitude, val.Longitude, val.ZoneId);
        tempArray.push(...tempArray, {
          position: [val.Latitude, val.Longitude],
          message: val.ZoneId,
        });
      });

      console.log(tempArray);
      setMarkers(tempArray);
      setLoading(false);
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllZones();
  }, []);

  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
  });

  const handleMarkerClick = (marker) => {
    setSelectedZone(marker.message);
    setMapActive(false);
  };
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {markers.length > 0 && mapActive ? (
          <MapContainer
            center={markers.length > 0 ? markers[0].position : null}
            zoom={17}
            style={{ width: "1400px", height: "860px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                eventHandlers={{ click: () => handleMarkerClick(marker) }}
                icon={customMarkerIcon}
              >
                <Tooltip>{marker.message}</Tooltip>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <ZoneData selectedZone={selectedZone} setMapActive={setMapActive} />
        )}
      </DashboardLayout>
    );
  }
}

export default Locator;
