const nodemailer = require("nodemailer");

const sendEmail = async ({
email,
subject,
message,
}) => {
try {
const transporter =
nodemailer.createTransport({
host: "smtp.gmail.com",
port: 587,
secure: false,

    auth: {
      user:
        process.env
          .GMAIL_USER,
      pass:
        process.env
          .GMAIL_PASS,
    },
  });

await transporter.sendMail({
  from: `"ShopNest Support" <${process.env.GMAIL_USER}>`,
  to: email,
  subject,
  html: message,
});

console.log(
  `✅ Email sent to ${email}`
);

return true;


} catch (error) {
console.error(
"Email Error:",
error.message
);


return false;

}
};

module.exports = sendEmail;
