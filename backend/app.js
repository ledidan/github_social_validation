const express = require("express");
const dotenv = require("dotenv").config();
const twilio = require("twilio");
const firebase = require("firebase-admin");
const axios = require("axios");
const app = express();

PORT = process.env.PORT;

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
// Config Dotenv

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.get("/", (req, res) => {
  res.status(201).send("Welcome to github social app");
});
app.post("/CreateNewAccessCode", async (req, res) => {
  const { phoneNumber } = req.body;
  const accessCode = Math.random(100000, 999999).toString();
  await firebase
    .database()
    .ref(`phoneNumbers/${phoneNumber}`)
    .set({ accessCode });
  client.messages.create({
    to: phoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: `Your access code is: ${accessCode}`,
  });
  res.json({ accessCode });
});

app.post("/ValidateAccessCode", async (req, res) => {
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
    res.status(400).json({ success: false });
  }
});

app.get("/searchGithubUsers", async (req, res) => {
  const { q, page = 1, per_page = 10 } = req.query;
  const response = await axios.get(
    `https://api.github.com/search/users?q=${q}&page=${page}&per_page=${per_page}`
  );
  const users = response.data.items.map((item) => ({
    login: item.login,
    id: item.id,
  }));
  res.json(users);
});

app.get("/findGithubUserProfile", async (req, res) => {
  const { github_user_id } = req.query;
  const response = await axios.get(
    `https://api.github.com/user/${github_user_id}`
  );
  const { login, id, avatar_url, html_url, public_repos, followers } =
    response.data;
  res.json({ login, id, avatar_url, html_url, public_repos, followers });
});

app.post("/likeGithubUser", async (req, res) => {
  const { phone_number, github_user_id } = req.body;
  await firebase
    .database()
    .ref(`phoneNumbers/${phone_number}/favorite_github_users`)
    .push(github_user_id);
  res.sendStatus(200);
});

app.get("/getUserProfile", async (req, res) => {
  const { phone_number } = req.query;
  const phoneNumberData = await firebase
    .database()
    .ref(`phoneNumbers/${phone_number}`)
    .once("value");
  res.json({
    favorite_github_users: Object.values(
      phoneNumberData.val().favorite_github_users
    ),
  });
});

app.listen(PORT, () => console.log(`Listening on port - ${PORT}`));
