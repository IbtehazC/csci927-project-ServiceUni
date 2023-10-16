const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const amqp = require("amqplib/callback_api");
const app = express();

const { seedCourses } = require("./seed.js");

app.use(cors());

mongoose
  .connect("mongodb://mongo:27017/universityCourses", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

const CourseSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  enrolledStudents: [String],
  faculty: String,
});

const Course = mongoose.model("Course", CourseSchema);

app.use(express.json());

mongoose.connection.on("connected", async () => {
  const count = await mongoose.connection.db
    .collection("courses")
    .countDocuments();
  if (count == 0) {
    await Course.insertMany(seedCourses);
  }
});

// var userId = "";

// amqp.connect("amqp://localhost", function (error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   connection.createChannel(function (error1, channel) {
//     if (error1) {
//       throw error1;
//     }
//     var queue = "user";

//     channel.assertQueue(queue, {
//       durable: false,
//     });

//     studentId = queue;
//     console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

//     channel.consume(
//       queue,
//       function (msg) {
//         console.log(" [x] Received %s", msg.content);
//       },
//       {
//         noAck: true,
//       }
//     );
//   });
// });

// Get all courses

app.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.send(courses);
});

// Get all courses for the student
app.get("/:id/courses", async (req, res) => {
  const courses = await Course.find({ enrolledStudents: req.params.id });
  res.send(courses);
});

app.get("/faculty/:id/courses", async (req, res) => {
  const courses = await Course.find({ faculty: req.params.id });
  res.send(courses);
});

// Create a new course
app.post("/courses", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send({ message: "Course added", course });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error adding course", error: error.message });
  }
});

// Get course by ID
app.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }
    res.status(200).send({ message: "Course Found", course });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Finding course", error: error.message });
  }
});

// Delete existing course
app.delete("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }
    await course.remove();
    res.status(200).send({ message: "Course deleted", course });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting course", error: error.message });
  }
});

// Enroll new students
app.post("/faculty/:facultyId/course/:courseId/enroll", async (req, res) => {
  const { studentId } = req.body;

  // First, verify the student exists in user-authentication service
  const userResponse = await fetch(`http://localhost:4000/users/${studentId}`);
  const user = await userResponse.json();

  if (user && user.role === "student") {
    const course = await Course.findById(req.params.courseId);
    if (course.faculty === req.params.facultyId) {
      course.enrolledStudents.push(studentId);
      await course.save();
      res.status(200).send({ message: "Student enrolled", course });
    }
  } else {
    res.status(404).send({ message: "Student not found or not a student" });
  }
});

// Assign faculty to the course
app.post("/courses/:courseId/assign-faculty", async (req, res) => {
  const { facultyId } = req.body;

  // Verify the faculty exists in user-authentication service
  try {
    const userResponse = await fetch(
      `http://localhost:4000/users/${facultyId}`
    );
    const user = await userResponse.json();

    if (user && user.role === "faculty") {
      const course = await Course.findById(req.params.courseId);
      course.faculty = facultyId;
      await course.save();
      res.status(200).send({ message: "Faculty assigned", course });
    } else {
      res.status(404).send({ message: "Faculty not found or not a faculty" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error assigning faculties", error: error });
  }
});

// Add course by student if available
app.post("/:studentId/courses/:courseId/addcourse", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (course && course.enrolledStudents.length < course.capacity) {
      course.enrolledStudents.push(req.params.studentId);
      await course.save();
      res.send({ message: "Enrolled to the course", course });
    } else res.status(400).send({ message: "Course full" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error adding course", error: error.message });
  }
});

app.listen(3002, () =>
  console.log("Course Add Drop Service running on port 3002")
);
