const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { seedBooks } = require("./seed");
const app = express();

app.use(cors());

mongoose
  .connect("mongodb://mongo:27017/universityLibrary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  rentedBy: {
    type: String,
    default: "",
  },
});

const Book = mongoose.model("Book", BookSchema);

app.use(express.json());

mongoose.connection.on("connected", async () => {
  const count = await mongoose.connection.db
    .collection("books")
    .countDocuments();
  if (count == 0) {
    await Book.insertMany(seedBooks);
  }
});

// Get all books
app.get("/books", async (req, res) => {
  const books = await Book.find({});
  res.send(books);
});

// Get all books rented by student with ID
app.get("/:studentId/books", async (req, res) => {
  const books = await Book.find({ rentedBy: req.params.studentId });
  res.send(books);
});

app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send({ message: "Book added", book });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error adding book", error: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    await book.remove();
    res.status(200).send({ message: "Book deleted", book });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting book", error: error.message });
  }
});

app.post("/:studentId/rent", async (req, res) => {
  const { bookId } = req.body;

  if (!bookId || !req.params.studentId) {
    return res
      .status(400)
      .json({ error: "Book ID and Student ID are required." });
  }

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    if (book.rentedBy) {
      return res.status(400).json({ error: "Book is already rented." });
    }

    console.log(book);
    book.rentedBy = req.params.studentId;
    console.log(book);
    await book.save();

    res.status(200).send({ message: "Book rented successfully.", book });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error });
  }
});

app.listen(3001, () =>
  console.log("Library Book Rental Service running on port 3001")
);
