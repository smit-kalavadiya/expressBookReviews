const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{
    username:"",
    password:""
}
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid

if(!username == ""){
    return true
}
return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

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
        }, 'access', { expiresIn: 60 * 60 });
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

  const isbn = req.params.isbn;
  const review = {
    "username":req.session.authorization.username,
    "review":req.query.review
  }
  books[isbn].reviews = review;
  

  if(!req.query.review){
    return res.status(208).json({message: "Please enter a review"});
  }
  return res.status(200).send("The review for the book with ISBN "+isbn +" has been added/updated.");
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn
    const key_aar = Object.keys(books);
    key_aar.filter((key) => {
        if(books[key].reviews.username === req.session.authorization.username){
            delete books[key].reviews.username
            delete books[key].reviews.review
        }
    })
    res.send(`Review for the ISBN ${isbn} posted by the user ${req.session.authorization.username} deleted.`)
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
