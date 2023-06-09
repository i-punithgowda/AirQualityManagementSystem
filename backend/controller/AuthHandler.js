const Auth = require("../model/Auth");

const AuthHandler = {
  adminLogin: async (req, res) => {
    try {
      const data = req.body;
      const response = await Auth.adminLogin(data);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  customerLogin: async (req, res) => {
    try {
      const data = req.body;
      const response = await Auth.customerAuth(data);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  insertCustomer: async (req, res) => {
    try {
      const data = req.body;
      const response = await Auth.insertCustomer(data);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  removeCustomerFromTelegram: async (req, res) => {
    try {
      const data = req.body;
      const response = await Auth.removeCustomerFromTelegram(data);
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = AuthHandler;
