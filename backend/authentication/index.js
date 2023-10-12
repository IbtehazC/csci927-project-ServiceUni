const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const amqp = require("amqplib/callback_api");
const app = express();

const { co } = require("./seed");

app.use(cors());

mongoose
  .connect("mongodb://mongo:27017/universityUsers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection opened"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "faculty", "admin"],
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

app.use(express.json());

mongoose.connection.on("connected", async () => {
  const count = await mongoose.connection.db
    .collection("users")
    .countDocuments();
  if (count == 0) {
    await User.insertMany(seedUsers);
  }
});

// if(User.collection('users'))

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}); // This retrieves all users
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

app.post("/register", async (req, res) => {
  // const existingUser = await User.findOne({ username });
  // if (existingUser) {
  //   return res.status(400).json({ error: "User already exists." });
  // }
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "User registered", user });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) res.send({ message: "Logged in", user });
  else res.status(401).send({ message: "Invalid credentials" });
});

app.listen(4000, () =>
  console.log("User Authentication Service running on port 4000")
);
