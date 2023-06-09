import Customer from "layouts/customer";

const custroutes = [
  {
    type: "route",
    name: "customer",
    key: "customer",
    route: "/customer",
    icon: "s",
    component: Customer,
    noCollapse: true,
    display: false,
  },
  {
    type: "collapse",
    name: "Customer-zone",
    key: "customerzone",
    route: "/customer/zone",
    icon: "as",
    component: Customer,
    noCollapse: true,
    display: false,
  },
  {
    type: "collapse",
    name: "Customer-Prediction",
    key: "customerprediction",
    route: "/customer/prediction",
    icon: "as",
    component: Customer,
    noCollapse: true,
    display: false,
  },
];

export default custroutes;
