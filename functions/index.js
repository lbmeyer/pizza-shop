const functions = require('firebase-functions');
const nodemailer = require("nodemailer");
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const { email, password } = require('./config');

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
});

mailTransport.use("compile", htmlToText());

const APP_NAME = "Mamas's Pizza";

exports.sendUserEmail = functions.database
  .ref("/orders/{pushId}")
  .onCreate(order => {
    sendOrderEmail(order.val());
  });

function sendOrderEmail(order) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@mamaspizzeria.com`,
    to: order.email,
    subject: `Your order from ${APP_NAME}`,
    html: `
      <table style="width: 500px; margin: auto">
        <tr>
          <th>${order.displayName}</th>
          <th>Thank you for your order at Mama's Pizzeria.</th>
          <br />
          <br />
        </tr>
        <tr>
          <td>Item</td>
          <td style="text-align: center;">Quantity</td>
          <td>Price</td>
        </tr>
        ${order.order.map(({name, quantity, price}) => `
          <tr>
            <td>${quantity}</td>
            <td style="text-align: center;">${name}</td>
            <td>${price}</td>
          </tr>
        `).join("")}
        <br />
        <br />
        <br />
        <tr>
          <td>Total Cost: </td>
          <td></td>
          <td>$9</td>  
        </tr>
      </table>
    `
  };
  mailTransport.sendMail(mailOptions)
}