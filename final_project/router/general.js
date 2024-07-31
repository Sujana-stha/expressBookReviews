const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');

let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  
  // Send JSON response with formatted friends data
  let allbooks = await books;
  res.send(JSON.stringify(allbooks, null, 4))
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let isbn_book = await books[isbn];
  if (isbn_book) {
    res.send(isbn_book);
  } else {
    res.send("ISBN with book not found.")
  }
  return res.status(300).json({message: isbn_book});
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  let author = req.params.author;
  const filteredBooks = await Object.fromEntries(
    Object.entries(books).filter(([key, value]) => value.author === author)
  );
  if (filteredBooks) {
    res.send(JSON.stringify(filteredBooks, null, 4));
  } else {
    res.send(`Books by ${author} Not found`);
  }
  
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  let title = req.params.title;
  const filteredBooks = await Object.fromEntries(
    Object.entries(books).filter(([key, value]) => value.title === title)
  );
  if (filteredBooks) {
    res.send(JSON.stringify(filteredBooks, null, 4));
  } else {
    res.send(`Books titled ${title} Not found`);
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let bookReview = books[isbn].reviews
  if (bookReview) {
    res.send(bookReview)
  } else {
    res.send("Not found!")
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
