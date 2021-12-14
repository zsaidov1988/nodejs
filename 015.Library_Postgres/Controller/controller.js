const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('./validations');
// const moongose = require('mongoose');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const envVar = require('../config/index');

const crud = require('./crud');

module.exports.main = (req, res) => {
  res.render('index');
}

module.exports.loginPage = (req, res) => {
  res.render('login');
}

module.exports.loginAuth = async (req, res) => {
  const { error } = validator.authValidate(req.body);
  if (error) {
    return res.status(401).send(error.details[0].message);
  }
  let user = await crud.getUser(req.body.login);
  if (user.rows.length === 0) {
    return res.status(400).send("Login yoki parol noto'g'ri");
  }
  const isValidPassword = await bcrypt.compare(req.body.password, user.rows[0].password);
  if (!isValidPassword) {
    return res.status(400).send("Login yoki parol noto'g'ri");
  }
  const token = jwt.sign({ _id: user.rows[0].id, role: user.rows[0].role }, envVar.SECRET_CODE);
  localStorage.setItem("token", token);
  // res.header('x-auth-token', token).redirect("/me").send(token);
  res.redirect("/me");
}

module.exports.userMe = async (req, res) => {
  // if(!isValidId(req.user._id)) {
  //   return res.status(404).send("Yaroqsiz id")
  // }
  const user = await crud.getUserById(req.user._id);
  res.send(user.rows[0]);
}

module.exports.newUser = (req, res) => {
  res.render('newuser');
}

module.exports.adminPage = async (req, res) => {
  const users = await crud.getUsers();
  const books = await crud.getBooks();
  const authors = await crud.getAuthors();
  res.render('adminpanel', {
    data: {
      users: users.rows,
      books: books.rows,
      authors: authors.rows
    }
  });
}


module.exports.signIn = async (req, res) => {
  // const { error } = validator.userValidate(req.body);
  // if (error) {
  //   return res.status(401).send(error.details[0].message);
  // }
  // let user = await crud.getUser(req.body.login); 
  // if (user) {
  //   return res.status(401).send('Bunday foydalanuvchi mavjud');
  // }

  const salt = await bcrypt.genSalt();
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const addedUser = await crud.newUser(req.body);

  res.status(200).send('Succsess');
}

module.exports.addAuthor = async (req, res) => {
  const { error } = validator.authorValidate(req.body);
  if (error) {
    return res.status(401).send(error.details[0].message);
  }
  const addedAuthor = await crud.newAuthor(req.body);
  if (!addedAuthor) {
    res.status(400).send('Dublicat');
  }
  res.status(200).redirect("/admin");
}

module.exports.addBook = async (req, res) => {
  const { error } = validator.bookValidate(req.body);
  if (error) {
    return res.status(401).send(error.details[0].message);
  }
  console.log(req.body);
  const addedBook = await crud.newBook(req.body);
  if (!addedBook) {
    res.status(400).send('Dublicat');
  }
  res.status(200).redirect("/admin");
}

// function isValidId(id) {
//   return moongose.Types.ObjectId.isValid(id);
// }
