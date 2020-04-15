require('dotenv').config();

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import nodemailer from 'nodemailer';
import cors from 'cors';
import smtpTransport from 'nodemailer-smtp-transport';
import Mail from 'nodemailer/lib/mailer';

admin.initializeApp();

let transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  }),
);

export const sendMail = functions.https.onRequest((req, res) => {
  cors({origin: true})(req, res, () => {
    const {dest, roomId} = req.query;

    const mailOptions: Mail.Options = {
      from: `Wasim Almadfaa <${process.env.ADMIN_EMAIL}>`,
      to: dest.toString(),
      subject: 'invite to video call on react-webrtc',
      html: `<p>you are invited to private video call on react-webrtc, you will find the room link below</p><br/>
      invite-link: <b><a href="https://react-webrtc-8c322.web.app/chat-room/${roomId.toString()}">react-webrtc-8c322.web.app/chat-room/${roomId.toString()}</a></b>
      room-id: <b>${roomId.toString()}</b>
      <br/><br/>
      <i><a href="https://react-webrtc-8c322.web.app">react-webrtc</a> is an <b>open source</b> peer-to-peer video conferencing app.<br/>
      you can find the source code on <a href="https://github.com/wmadfaa/react-webrtc">github.com/wmadfaa/react-webrtc</a>
      </i>
      `,
    };
    return transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        return res.send(err.message);
      }
      return res.send('Sended');
    });
  });
});
