const mongoose = require('mongoose');
const envVar = require('./config/index');

// { useNewUrlParser: true, useUnifiedTopology: true } - warning chiqmasligi uchun
mongoose.connect(envVar.ADDRESS_MONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Mongo ga ulanish");
}) 
.catch((err) => {
  console.error("Ulanishda xatolik yuz berdi", err);
})

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: {type: Date, default: Date.now},
  isPublished: Boolean
})

const Book = mongoose.model("Book", bookSchema);

async function createBook() {
  const book = new Book({
    name: "Taqdir",
    author: "Zafar",
    tags: ["Don", "Xayr", "Bir"],
    isPublished: true
  });
  
  const savedBook = await book.save(); // asinxron metod bo'lgani uchun await yoziladi. ya'ni natija kelishini kutib turamiz
  console.log(savedBook);
}

async function getBook() {
  const pageNumber = 3;
  const pageSize = 10;
  const book = await Book
  // .find({ name: "Ufq", isPublished: true })
  //.find({ price: {$gt: 10} }) // gt - great then
  //.find({ price: {$in: [10, 20, 30]} }) // 10 yoki 20 yoki 30 ga teng
  .or([{name: "Taqdir"}, {isPublished: true}])
  .skip((pageNumber - 1) * pageSize) // Pagination uchun. nechta hujjatni o`tkazib yuborishni bildiradi
  .limit(pageSize) // skip da o'tkazib yuborilganlardan keyingisini oladi
  .sort({name: 1}) // 1 asc, -1 desc
  .select({name: 1, tags: 1}) // 1 larni oladi, 0 larni olmaydi
  .countDocuments(); // shartlarga to'g'ri keladigan itemlar sonini beradi
  console.log(book);
}

getBook();