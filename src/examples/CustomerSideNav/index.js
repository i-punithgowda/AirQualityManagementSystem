import { useEffect } from "react";

import { useLocation, NavLink } from "react-router-dom";

import Prediction from "layouts/customer/Prediction";
import ZoneData from "layouts/locator/ZoneData";

import PropTypes from "prop-types";
import { IoLocationSharp } from "react-icons/io5";
import { IoDesktopSharp } from "react-icons/io5";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

import VuiBox from "../../components/VuiBox";
import VuiTypography from "../../components/VuiBox";
import VuiButton from "../../components/VuiBox";

import SidenavCollapse from "./SidenavCollapse";
import SidenavCard from "./SidenavCard";

import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";

import { useVisionUIController, setMiniSidenav, setTransparentSidenav } from "context";

import SimmmpleLogo from "examples/Icons/SimmmpleLogo";
import Button from "assets/theme/components/button";
import contained from "assets/theme/components/button/contained";
import ZoneDataCustomer from "layouts/customer/ZonedataCustomer";

function CustomerSidenav({ color, brandName, currState, setCurrState, ...rest }) {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  const routes = [
    {
      type: "collapse",
      name: "prediction",
      key: "prediction",
      route: "/customer/prediction",
      icon: "",
      noCollapse: true,
      display: true,
    },
    {
      type: "collapse",
      name: "zone",
      key: "zonr",
      route: "/customer/zone",
      icon: "",
      noCollapse: true,
      display: true,
    },
  ];

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    window.addEventListener("resize", handleMiniSidenav);

    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  useEffect(() => {
    if (window.innerWidth < 1440) {
      setTransparentSidenav(dispatch, true);
    }
  }, []);

  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, route, href, display }) => {
      let returnValue;

      if (type === "collapse" && display == true) {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              color={color}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink to={route} key={key}>
            <SidenavCollapse
              color={color}
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
      } else if (type === "divider") {
        returnValue = <Divider light key={key} />;
      }

      return returnValue;
    }
  );

  console.log(renderRoutes);

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <VuiBox
        pt={3.5}
        pb={0.5}
        px={1}
        textAlign="center"
        sx={{
          overflow: "unset !important",
        }}
      >
        <VuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <VuiTypography variant="h6" color="text">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </VuiTypography>
        </VuiBox>
        <VuiBox component={NavLink} to="/" display="flex" alignItems="center">
          <VuiBox
            sx={
              ((theme) => sidenavLogoLabel(theme, { miniSidenav }),
              {
                display: "flex",
                alignItems: "center",
                margin: "0 auto",
              })
            }
          >
            <VuiBox
              display="flex"
              sx={
                ((theme) => sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
                {
                  mr: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                })
              }
            ></VuiBox>
            <VuiTypography
              variant="button"
              textGradient={true}
              color="logo"
              fontSize={14}
              letterSpacing={2}
              fontWeight="medium"
              sx={
                ((theme) => sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
                {
                  opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                  maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
                  margin: "0 auto",
                })
              }
            >
              {<span>AirQuality Management</span>}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <Divider light />
      <List>
        <Link onClick={() => setCurrState("zone")}>
          <SidenavCollapse
            color={color}
            name="Zone Data"
            icon={<IoLocationSharp />}
            active={currState == "zone" ? true : false}
            noCollapse=""
          />
        </Link>
      </List>

      <VuiBox
        my={2}
        mx={2}
        mt="auto"
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: {
            pt: 2,
          },
          [breakpoints.only("xl")]: {
            pt: 1,
          },
          [breakpoints.down("xl")]: {
            pt: 2,
          },
        })}
      ></VuiBox>
    </SidenavRoot>
  );
}

CustomerSidenav.defaultProps = {
  color: "info",
};

CustomerSidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CustomerSidenav;
