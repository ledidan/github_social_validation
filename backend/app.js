const express = require("express");
const dotenv = require("dotenv").config();
const twilio = require("twilio");
const firebase = require("firebase-admin");
const axios = require("axios");
const app = express();
const cors = require("cors");
const asyncHandler = require("express-async-handler");
PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
// Config Firebase Setup
firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Config Dotenv
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = twilio(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+16062223115", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+84778204547", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });

// Generate a random 6-digit access code
const generateAccessCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const accessCode = generateAccessCode();

app.get("/", (req, res) => {
  res.status(201).send("Welcome to github social app");
});

app.post(
  "/CreateNewAccessCode",
  asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
    if (phoneNumber) {
      await firebase
        .database()
        .ref(`phoneNumbers/${phoneNumber}`)
        .set({ accessCode });
      const messageConfig = {
        to: phoneNumber,
        from: `${process.env.TWILIO_PHONE_NUMBER}`,
        body: `Your github social access code is: ${accessCode}`,
      };
      await client.messages.create(messageConfig);
      res.json({
        message: `A OTP (6 digit code) has been sent to ( ${phoneNumber} ). Please enter the OTP in the field below to verify your phone`,
      });
    } else {
      res.status(500).json({
        error: "Invalid phone number, Please enter your phone correctly",
      });
    }
  })
);

app.post(
  "/ValidateAccessCode",
  asyncHandler(async (req, res) => {
    const { accessCode, phoneNumber } = req.body;
    const phoneNumberData = await firebase
      .database()
      .ref(`phoneNumbers/${phoneNumber}`)
      .once("value");
    if (phoneNumberData.val().accessCode === accessCode) {
      await firebase
        .database()
        .ref(`phoneNumbers/${phoneNumber}`)
        .update({ accessCode: "" });
      res.json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, error: `Invalid OTP Code Entered` });
    }
  })
);

app.get(
  "/searchGithubUsers",
  asyncHandler(async (req, res) => {
    const { q, page = 1, per_page = 10 } = req.query;
    const response = await axios.get(
      `https://api.github.com/search/users?q=${q}&page=${page}&per_page=${per_page}`
    );
    // const users = response.data.items.map((item) => ({
    //   login: item.login,
    //   id: item.id,
    // }));
    const users = response.data;
    res.json(users);
  })
);

app.get(
  "/findGithubUserProfile",
  asyncHandler(async (req, res) => {
    const { github_user_id } = req.query;
    const response = await axios.get(
      `https://api.github.com/user/${github_user_id}`
    );
    const { login, id, avatar_url, html_url, public_repos, followers } =
      response.data;
    res.json({ login, id, avatar_url, html_url, public_repos, followers });
  })
);

app.post(
  "/likeGithubUser",
  asyncHandler(async (req, res) => {
    const { phoneNumber, github_user_id } = req.body;
    const response = await axios.get(
      `https://api.github.com/user/${github_user_id}`
    );
    const { login, id, avatar_url, html_url, public_repos, followers } =
      response.data;
    const user = {
      id: id,
      login: login,
      avatar_url: avatar_url,
      html_url: html_url,
      public_repos: public_repos,
      followers: followers,
    };

    await firebase
      .database()
      .ref(`phoneNumbers/${phoneNumber}/favorite_github_users`)
      .push(user.set({ user }));

    res.sendStatus(200);
  })
);
app.get(
  "/getUserProfile",
  asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
    const phoneNumberData = await firebase
      .database()
      .ref(`phoneNumbers/${phoneNumber}`)
      .once("value");
    if (!phoneNumberData.val()) {
      return res.status(404).json({
        error: "phoneNumber not found in the firebase",
      });
    }
    res.json({
      favorite_github_users: Object.values(
        phoneNumberData.val().favorite_github_users
      ),
    });
  })
);

app.listen(PORT, () => console.log(`Listening on port - ${PORT}`));

module.exports = app;
