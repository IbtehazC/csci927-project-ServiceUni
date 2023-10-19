const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const { seedUsers } = require("./seed");

app.use(cors());

mongoose
  .connect("mongodb://mongo:27017/universityUsers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection opened"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
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

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}); // This retrieves all users
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // This retrieves all users
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

app.get("/users/get/name", async (req, res) => {
  try {
    const { firstname, lastname } = req.query;
    if (!firstname || !lastname) {
      return res
        .status(400)
        .send({ message: "Both firstname and lastname are required" });
    }
    console.log(firstname, lastname);
    const user = await User.findOne({ firstname, lastname });
    if (user) {
      res.status(200).send({ id: user._id });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

app.get("/users/get/id", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).send({ message: "Id is required" });
    }
    const user = await User.findById(id);
    if (user) {
      res
        .status(200)
        .send({ firstname: user.firstname, lastname: user.lastname });
    } else {
      res.status(404).send({ message: "User not found" });
    }
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

app.delete("/users/:id", async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    // Check if the user exists
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Prevent deletion of admin users
    if (user.role === "admin") {
      return res.status(403).send({ message: "Cannot delete admin users" });
    }

    // Delete the user
    await User.findByIdAndDelete(req.params.id);

    // Send a success response
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

app.listen(3000, () =>
  console.log("User Authentication Service running on port 3000")
);
