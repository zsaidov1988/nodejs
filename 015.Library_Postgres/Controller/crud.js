
const db = require('../model/db');

//CREATE

module.exports.newUser = async (body) => {
  try {
    const newUser = await db.query("INSERT INTO users (name, login, password, role) values ($1, $2, $3, 'user') RETURNING *", [body.name, body.login, body.password]);
    return newUser.rows[0];
  }
  catch(ex) {
    console.log(ex);
  }
}

module.exports.newBook = async (body) => {
  try {
    const newBook = await db.query("INSERT INTO books (title, authorId, qty) values ($1, $2, $3) RETURNING *", [body.title, body.author, body.qty]);
    return newBook.rows[0];
  }
  catch(ex) {
    console.log(ex);
  }
}

module.exports.newAuthor = async (body) => {

  try {
    const newAuthor = await db.query("INSERT INTO authors (name) values ($1) RETURNING *", [body.name]);
    return newAuthor.rows[0];
  }
  catch(ex) {
    console.log(ex);
  }

}

// READ

module.exports.getAuthors = async () => {
  return await db.query("SELECT * FROM authors");
  // return await modelAuthors.find().select({name: 1, _id: 1});
}

module.exports.getAuthor = async (id) => {
  return await db.query("SELECT * FROM authors WHERE id=$1", [id]);
  // return await modelAuthors.findById({_id: id});
}

module.exports.getBooks = async () => {
  return await db.query("SELECT * FROM books INNER JOIN authors ON books.authorid = authors.id");
  // return await modelBooks.find().populate('authorId', "name -_id");
}

module.exports.getBook = async (id) => {
  return await db.query("SELECT * FROM books WHERE id=$1", [id]);
  // return await modelBooks.findById({_id: id});
}

module.exports.getUsers = async () => {
  return await db.query("SELECT * FROM users");
  // return await modelUsers.find();
}

module.exports.getUser = async (login) => {
  return await db.query("SELECT * FROM users WHERE login=$1", [login]);
  // return await modelUsers.findOne({login: login});
}

module.exports.getUserById = async (id) => {
  return await db.query("SELECT id, name, login, books FROM users WHERE id=$1", [id]);
  // return await modelUsers.findById({_id: id}).select("-password");
}
