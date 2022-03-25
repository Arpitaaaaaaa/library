const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());
const books = [
  {
    id: 1,
    title: "The Lion, the Witch and the Wardrobe",
    author: "C. S. Lewis",
    language: "English",
    publishedYear: 1950,
    genre: "Fantasy",
  },
  {
    id: 2,
    title: "She: A History of Adventure",
    author: "H. Rider Haggard",
    language: "English",
    publishedYear: 1887,
    genre: "Adventure",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    language: "Portuguese",
    publishedYear: 1988,
    genre: "Fantasy",
  },
];

app.get("/books", (req, res) => {
  res.send(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === +req.params.id);
  if (!book) return res.status(404).send("No books exists at this id!");
  res.send(book);
});

app.post("/books", (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    language: req.body.language,
    publishedYear: req.body.publishedYear,
    genre: req.body.genre,
  };
  books.push(book);
  res.send(book);
});

app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === +req.params.id);
  if (!book) return res.status(404).send("No book found in this id");

  //update the books
  book.title = req.body.title;
  book.author = req.body.author;
  book.language = req.body.language;
  book.publishedYear = req.body.publishedYear;
  book.genre = req.body.genre;

  res.send(book);
});

app.delete("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === +req.params.id);
  if (!book) return res.status(404).send("No book to delete at this id");

  const index = books.indexOf(book);
  books.splice(index, 1);
  res.send(book);
});

function validateBook(book) {
  const schema = {
    title: Joi.title.string().min(2).required(),
    author: Joi.author.string().min(3).required(),
    language: Joi.language.string().min(3).required(),
    publishedYear: Joi.publishedYear.int().min(4).required(),
    genre: Joi.genre.string().min(4).required(),
  };

  return Joi.validate(book, schema);
}
const port = process.env.PORT || 4000;
app.listen(4000, () => console.log(`Server started on ${port}.....`));
