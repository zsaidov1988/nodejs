// const mongoose = require('mongoose');
const envVar = require('./config/index');
const express = require('express');
// require('express-async-error'); // app.use larni oxirida xatolarni log qilish uchun
// const errors = require('./middleware/errors');


// mongoose.connect(envVar.ADDRESS_MONGO, {
//   useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true 
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true
//   }).then(() => console.log("Mongo ishga tushdi")).catch((ex) => console.log("Mongo ga ulanishda xatolik", ex))

  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', 'views');

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use(express.static('public'));
  
  const Routes = require('./Routes/router');
  
  app.use(Routes);

  // app.use(errors)

  // require('./startup/prud')(app);
  
  const PORT = envVar.PORT || 7000
  app.listen(PORT, () => console.log(`Server is running on ${PORT}-port`));
