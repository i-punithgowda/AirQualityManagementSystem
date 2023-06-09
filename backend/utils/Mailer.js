var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
async function Mailer(subject, message, email) {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: process.env.smtp_email,
      auth: {
        user: "globalimsbank@gmail.com",
        pass: process.env.smtp_pass,
      },
    })
  );

  var mailOptions = {
    from: "globalimsbank@gmail.com",
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = Mailer;
