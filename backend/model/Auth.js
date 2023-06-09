const db = require("../config/db");
const Mailer = require("../utils/Mailer");
const generateRandomPassword = require("../utils/generatePassword");

const Auth = {};

Auth.adminLogin = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `select * from admin where username='${data.username}' && password='${data.password}'`,
      (err, results) => {
        if (err) {
          reject({ status: false, message: err });
          console.log(err);
        } else {
          if (results.length == 0) {
            console.log("sdf", results);
            reject({ status: false, message: "Invalid credentials!!" });
          } else {
            console.log("ssadfdf", results);
            resolve({ status: true, message: "Login Successful" });
          }
        }
      }
    );
  });
};

Auth.customerAuth = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `select * from customer where email='${data.email}' && password='${data.password}'`,
      (err, results) => {
        if (err) {
          reject({ status: false, message: err });
        } else {
          if (results.length == 0) {
            reject({ status: false, message: "Invalid Credentials" });
          } else {
            resolve({ status: true, message: "Login Succesful" });
          }
        }
      }
    );
  });
};

Auth.insertCustomer = (data) => {
  const password = generateRandomPassword(8);

  return new Promise((resolve, reject) => {
    // Check if email or phone number already exists
    db.query(
      `SELECT COUNT(*) AS count FROM customer WHERE email='${data.email}' OR phone='${data.phone}'`,
      (err, results) => {
        if (err) {
          reject({ status: false, message: err });
        } else {
          const count = results[0].count;
          if (count > 0) {
            reject({ status: false, message: "Email or phone number already exists" });
          } else {
            // Insert customer data
            db.query(
              `INSERT INTO customer (name, email, phone, password, ZoneId) VALUES ( '${data.name}', '${data.email}', '${data.phone}', '${data.password}', '${data.ZoneId}')`,
              (err, results) => {
                if (err) {
                  reject({ status: false, message: err });
                } else {
                  const subject = "Accounted data saved and zone assigned";
                  const message = `Welcome ! now you can login to our website to monitor your zone . your login credentials are :
                  email : ${data.email} & password : ${password} . Dont forget to change your password soon.
                  `;
                  Mailer(subject, message, data.email);
                  resolve({ status: true, message: "Customer Data Stored!" });
                }
              }
            );
          }
        }
      }
    );
  });
};

Auth.removeCustomerFromTelegram = (data) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from customer where telegramId='${data.telegramId}' `, (err, results) => {
      if (err) {
        reject({ status: false, message: err });
      } else {
        if (results.length == 0) {
          reject({ status: false, message: "Invalid telegramID" });
        } else {
          db.query(
            `update customer set telegramId='null' where telegramId='${data.telegramId}'`,
            (err, result) => {
              if (err) {
                reject({ status: false, message: err });
              } else {
                resolve({ status: true, message: "Succesfully unsubscribed!!" });
              }
            }
          );
        }
      }
    });
  });
};

module.exports = Auth;
