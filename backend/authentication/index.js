const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/universityUser", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log(result))
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
  // List of courses that the user can add or drop
  courses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Course",
    default: null,
  },
  // List of books that the user can rent or return
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      default: null,
    },
  ],
});

const User = mongoose.model("User", UserSchema);

app.use(express.json());

app.get("", async (req, res) => {
  res.status(200).send("you have reached");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}); // This retrieves all users
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

app.post("/register", async (req, res) => {
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
