const envVar = require('./config/index');
const mongoose = require('mongoose');

mongoose.connect(envVar.address_mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo ga ulandi");
  })
  .catch((ex) => {
    console.log(ex);
  });

const schemeAddr = mongoose.Schema({
  city: String,
  town: String,
  street: String,
  home: Number
}, { _id : false })

const schemeSt = mongoose.Schema({
  name: {type: String, required: true, maxlength: 40},
  last: {type: String, required: true, maxlength: 40},
  age: {
    type: Number,
    get: val => Math.round(val), // ma'lumot get qilinayotganda funksiya ishlaydi.
    set: val => Math.round(val) // Bu esa set qilinayotganda ishlaydi
  },
  hobby: {
    type:[ String ],
    validate: {
      isAsync: true,
      validator: function(val) {
        return val && val.length > 1;
      },
      message: "Wrong hobby"
    },
    // match: /RegExp/
  },
  address: schemeAddr
}, { collection: "student" })

const StudentModel = mongoose.model("Student", schemeSt);

// CREATE
async function createStudent(name, last, age, hobby, city, town, street, home) {
  const newStudent = new StudentModel({
    name,
    last, 
    age,
    hobby,
    address: {
      city,
      town, 
      street,
      home
    }
  });
  try {
    //await newStudent.validate();
    const savedST = await newStudent.save()
    return savedST;
  }
  catch(ex) {
    return ex;
  }
}

//READ

async function getStudent() {
  return await StudentModel
    .find()
    .select({name: 1, city: 1, age: 1, _id: 0})
    .sort({age: -1})
}

// UPDATE

async function updateStudent(id) {
  const student = await StudentModel.findById(id);
  if (!student) {
    return
  }

  //1-usul:

  student.name = "Bobur";
  student.age = 25;
  student.address.city = "Xorazm"
  const saved = await student.save();

  //2-usul. set da extiyot bo'lish kerak. obyektning berilmagan key lari yo`q qilib yuboriladi. Yangi key qo'shish uchun yaxshi yo`l.

  // const saved = await StudentModel.updateOne({_id: id}, {
  //   $set: {
  //     name: "Sardor",
  //     age: 22,
  //     address: {
  //       city: "Andijon",
  //       town: "Baliqchi", 
  //       street: "Quyosh",
  //       home: 22
  //     }
  //   }
  // })

  return saved;
}

// DELETE

async function deleteStudent(id) {
  // 1-usul
  // const result = await StudentModel.deleteOne({_id: id});
  // return result;

  // 2-usul
  const deletedST = await StudentModel.findByIdAndDelete({_id: id});
  return deletedST;
}

async function run() {
  // console.log(await createStudent("Ali", "Soliyev", 28, ["Play ball", "Watch TV"], "Buxoro", "Buxoro", "Buxoro", 54));

  //console.log(await getStudent());

  //console.log(await updateStudent("61a203f327115ed791d3368a"));

  console.log(await deleteStudent("61a2077df4fec778fdfe8949"));
}
//console.log(createStudent("Abror", "Aliyev", 24, ["Play ball"], "Navoiy", "Xatirchi", "Sharq", 75));
run();

