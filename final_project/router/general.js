const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
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

public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const author = req.params.author
    const key_aar = Object.keys(books);
    const filtered_auth = key_aar.filter((key) => books[key].author === author)
    const bookByAuthor = books[filtered_auth];
    res.send(JSON.stringify(bookByAuthor,null,4));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const title = req.params.title
    const key_aar = Object.keys(books);
    const filtered_title = key_aar.filter((key) => books[key].title == title)
    res.send(JSON.stringify(books[filtered_title],null,4));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    book = books[isbn];
    res.send(JSON.stringify(book.reviews,null,4));
});

module.exports.general = public_users;
