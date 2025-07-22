const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    const userName = req.body.username;
    const passWord = req.body.password;

    if (userName == "" || passWord == "") {
        return res.send("Please enter username or password");
    }
    existedUser = users.filter((user) => user.username == userName)
    if (existedUser.length > 0) {
        return res.send("User already registered ");
    }
    users.push({ "username": userName, "password": passWord })
    return res.send("Registered succesfully");
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    return res.send(JSON.stringify(books))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;

    return res.send(JSON.stringify(isbn));
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const author = req.params.author
    const key_aar = Object.keys(books);
    const filtered_auth = key_aar.filter((key) => books[key].author == author)
    return res.send(JSON.stringify(books[filtered_auth]));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const title = req.params.title
    const key_aar = Object.keys(books);
    const filtered_title = key_aar.filter((key) => books[key].title == title)
    return res.send(JSON.stringify(books[filtered_title]));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn
    const key_aar = Object.keys(books);
    const filtered_reviews = key_aar.filter((key) => books[key].reviews.isbn == isbn)
    return res.send(JSON.stringify(books[filtered_reviews]));
});

module.exports.general = public_users;
