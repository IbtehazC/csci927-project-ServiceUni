const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/universityLibrary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log(result))
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Book = mongoose.model("Book", BookSchema);

app.use(express.json());

app.get("/books", async (req, res) => {
  const books = await Book.find({});
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

app.post("/rent", async (req, res) => {
  const { bookId, studentId } = req.body;

  if (!bookId || !studentId) {
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

    book.rentedBy = studentId;
    await book.save();

    res.status(200).json({ message: "Book rented successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(3001, () =>
  console.log("Library Book Rental Service running on port 3001")
);
