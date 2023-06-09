import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignInAdmin from "layouts/authentication/sign-in-admin";
import SignUp from "layouts/authentication/sign-up";
import Home from "layouts/authentication/home";
import Locator from "layouts/locator";
import ZoneAdd from "layouts/zone";
import AddCustomer from "layouts/AddCustomer";
import RealTime from "layouts/RealTime";

// Vision UI Dashboard React icons
import { IoBarChartOutline, IoRocketSharp } from "react-icons/io5";
import { IoBarChart } from "react-icons/io5";
import { IoThermometerSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsPersonAdd } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";

const routes = [
  {
    type: "collapse",
    name: "Statistics",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoBarChart size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
    display: true,
  },
  {
    type: "collapse",
    name: "Add Customer",
    key: "addcustomer",
    route: "/add-customer",
    icon: <BsPersonAdd size="15px" color="inherit" />,
    component: AddCustomer,
    noCollapse: true,
    display: true,
  },
  {
    type: "collapse",
    name: "Add Zone",
    key: "addzone",
    route: "/add-zone",
    icon: <IoAddCircle size="15px" color="inherit" />,
    component: ZoneAdd,
    noCollapse: true,
    display: true,
  },

  {
    type: "collapse",
    name: "Real Time Graph",
    key: "realtimegraph",
    route: "/real-time-graph",
    icon: <IoThermometerSharp size="15px" color="inherit" />,
    component: RealTime,
    noCollapse: true,
    display: true,
  },

  {
    type: "collapse",
    name: "Zone Locator",
    key: "locator",
    route: "/zone-locator",
    icon: <IoLocation size="15px" color="inherit" />,
    component: Locator,
    noCollapse: true,
    display: true,
  },

  { type: "title", title: "Account Pages", key: "account-pages" },

  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
    display: false,
  },
  {
    type: "collapse",
    name: "AdminSign In",
    key: "admin-sign-in",
    route: "/authentication/admin-signin",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: SignInAdmin,
    noCollapse: true,
    display: false,
  },
  {
    type: "route  ",
    name: "Home",
    key: "home",
    route: "/",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: Home,
    noCollapse: true,
    display: false,
  },

  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: SignUp,
    noCollapse: true,
    display: false,
  },
];

export default routes;
