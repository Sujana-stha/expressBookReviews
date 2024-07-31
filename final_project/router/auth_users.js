const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  // Filter the users array for any user with the same username
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
  // Filter the users array for any user with the same username and password
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password);
  });
  // Return true if any valid user is found, otherwise false
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
    const password = req.body.password;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 * 60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  // let book = books[isbn];
  let review = req.body.message
  // book.reviews = reviews;
  let username = req.session?.authorization['username']

  if (!books[isbn]) {
    return res.status(404).send('Book not found');
  }

  // Add or update the review
  books[isbn].reviews[username] = review;

  res.send(books[isbn]);
  return res.status(300).json({message: "Yet to be implemented"});
});


// DELETE book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  // Update the code here

  let isbn = req.params.isbn;
  
  let username = req.session?.authorization['username']

  if (!books[isbn]) {
    return res.status(404).send('Book not found');
  }

 let review = books[isbn].reviews[username]
  if (review) {
    // Delete friend from 'friends' object based on provided email
    
    delete review;

    // Send response confirming deletion of friend
    res.send(`Review made by ${username} deleted.`);
  } else {
    res.send(`Cannot find your review`);
  }

  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
