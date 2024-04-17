const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

let showBooks = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 6000);
});

let isbnBook = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 6000);
});

let authorBook = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 6000);
});

let titleBook = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 6000);
});

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  showBooks.then((successMessage) => {
    res.send(JSON.stringify(books, null, 4));
  });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  if (req.params.isbn) {
    isbnBook.then((successMessage) => {
      res.send(JSON.stringify(books[req.params.isbn], null, 4));
    });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  let author = req.params.author;
  let newBookArray = [];
  let noBooks = true;
  for (var key in books) {
    if (books[key].author == author) {
      newBookArray.push(books[key]);
      noBooks = false;
    } else if (noBooks === true) {
      noBooks = true;
    }
  }
  if (noBooks === true) {
    res.send("Author Not Found");
  } else {
    authorBook.then((successMessage) => {
      res.send(JSON.stringify(newBookArray, null, 4));
    });
    
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  let title = req.params.title;
  let newBookArray = [];
  let noBooks = true;
  for (var key in books) {
    if (books[key].title == title) {
      newBookArray.push(books[key]);
      noBooks = false;
    } else if (noBooks === true) {
      noBooks = true;
    }
  }
  if (noBooks === true) {
    res.send("Author Not Found");
  } else {
    titleBook.then((successMessage) => {
      res.send(JSON.stringify(newBookArray, null, 4));
    });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  let isbn = req.params.isbn;
  if (isbn) {
    res.send(JSON.stringify(books[isbn].reviews, null, 4));
  }
});

module.exports.general = public_users;
