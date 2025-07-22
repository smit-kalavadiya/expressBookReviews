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

const existedUser = users.filter((user)=>user.username == username)
if(existedUser[0].username == username && existedUser[0].password == password){
    return true;
}
return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here

  if(authenticatedUser(req.body.username,req.body.password) && isValid(req.body.username)){
    jwt.sign({payload: req.body.username}, 'JWT_SECRET', (err, token) => {
        if (err) throw res.send(err);
        
        res.send("User logged in -"+ token);
      });
  }
  else{
    res.send("Username and password is invalid");
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  const isbn = req.params.isbn;

  console.log(books);
  
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
