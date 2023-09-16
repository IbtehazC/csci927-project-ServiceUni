// /library-book-rental/index.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/universityLibrary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    availableCopies: Number,
});

const Book = mongoose.model('Book', BookSchema);

app.use(express.json());

app.get('/books', async (req, res) => {
    const books = await Book.find({});
    res.send(books);
});

app.post('/books', async (req, res) => {
  try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).send({ message: 'Book added', book });
  } catch (error) {
      res.status(500).send({ message: 'Error adding book', error: error.message });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
      const book = await Book.findById(req.params.id);
      if (!book) {
          return res.status(404).send({ message: 'Book not found' });
      }
      await book.remove();
      res.status(200).send({ message: 'Book deleted', book });
  } catch (error) {
      res.status(500).send({ message: 'Error deleting book', error: error.message });
  }
});


app.post('/rent', async (req, res) => {
    const book = await Book.findById(req.body.bookId);
    if (book && book.availableCopies > 0) {
        book.availableCopies--;
        await book.save();
        res.send({ message: 'Book rented', book });
    } else res.status(400).send({ message: 'Book unavailable' });
});

app.listen(3001, () => console.log('Library Book Rental Service running on port 3001'));
