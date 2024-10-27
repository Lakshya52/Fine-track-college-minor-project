const express = require("express");
const app = express();

const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

app.set("view engine", "ejs");
app.use(cookieParser());
// app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.options('*', cors());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, email, password: hashedPassword });

    const response = await newUser.save();
    console.log("User data saved:", response);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error saving user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("something went wrong email");
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("something went wrong pass");
      return res.status(400).json({ error: "Invalid email or password." });
    }
    // ..........................................
    if (user) {
        const token = await jwt.sign({ id: user.id },  SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        console.log(token)
        return res.json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }   

    // ..........................................
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({ error: "An error occurred during login" });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
