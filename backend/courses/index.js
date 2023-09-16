// /course-add-drop/index.js

const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/universityCourses", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

const CourseSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  enrolled: Number,
});

const Course = mongoose.model("Course", CourseSchema);

app.use(express.json());

app.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.send(courses);
});

app.post('/courses', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).send({ message: 'Course added', course });
    } catch (error) {
        res.status(500).send({ message: 'Error adding course', error: error.message });
    }
});

app.delete('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).send({ message: 'Course not found' });
        }
        await course.remove();
        res.status(200).send({ message: 'Course deleted', course });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting course', error: error.message });
    }
});


app.post("/enroll", async (req, res) => {
  const course = await Course.findById(req.body.courseId);
  if (course && course.enrolled < course.capacity) {
    course.enrolled++;
    await course.save();
    res.send({ message: "Enrolled to the course", course });
  } else res.status(400).send({ message: "Course full" });
});

app.post("/drop", async (req, res) => {
  const course = await Course.findById(req.body.courseId);
  if (course && course.enrolled > 0) {
    course.enrolled--;
    await course.save();
    res.send({ message: "Dropped the course", course });
  } else res.status(400).send({ message: "Course not enrolled" });
});

app.listen(3002, () =>
  console.log("Course Add Drop Service running on port 3002")
);