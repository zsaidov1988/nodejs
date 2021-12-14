const mongoose = require('mongoose');
const envVar = require('./config/index');

mongoose.connect(envVar.mongo_addr, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("Mongoga ulandi");
})
.catch((err) => {
  console.log("ulanmadi " + err);
})

const innerScheme = new mongoose.Schema({
  h: { // Custom validator yaratish
    type: Number,
    validate: {
      isAsync: true, // Validator asinxron ekanligini bildiradi.
      validator: function(val, callback) { // val bu req da berilgan qiymat. ya'ni bazaga yozish uchun berilgan qiymat
        setTimeout(() => {
          const result = val && val > 20; // val null bo`'lmasligi va 20 dan katta bo'lishi. stringlarni length ni tekshirish mumkin.
          callback(result);
        }, 5000)
        
      },
      message: "h > 20 bo`lishi kerak"
    }
  },
  w: Number,
  uom: String
})

const itemSchema = new mongoose.Schema({
  item: { 
    type: String, 
    required: true,
    minlength: 3,
    maxlength: function() {
      return 10 + 47;
    },
    enum: ["Baliq","Osh"] // Faqat shu qiymatlar bo'lishi shart
  }, // required qilib qo`yish
  qty: { type: Number, min: 2, max: 80},
  size: innerScheme,
  status: String
}, { collection: "inventory" })

const Baza = mongoose.model("Inventory", itemSchema);

async function createItem() {
  const item = new Baza({
    item: "birnima",
    qty: 500,
    size: {
      h: 25,
      w: 89,
      uom: "m"
    },
    status: "A"
  });
  
  try{
    await item.validate(); // Bunday qilib ham tekshirib olish mumkin
    const savedItem = await item.save(); // asinxron metod bo'lgani uchun await yoziladi. ya'ni natija kelishini kutib turamiz
    console.log(savedItem);
  } 
  catch (ex) {
    console.log(ex);
  }
  
}

async function getItem() {
  return await Baza
  .find({status: "A"})
  .sort({item: 1})
  .select({item: 1, qty: 1, _id: 0})
}

async function getItem2() {
  return await Baza 
  //.find({ $or: [{qty: {$lte: 50}}, {item: /.*l.*/i}] }) // Yoki or ni alohida operator qilish mumkin
  .find()
  .or( [{qty: {$lte: 50}}, {item: /.*l.*/i}] )
  .sort({ qty: -1})
  .select({item: 1, qty: 1, _id: 0})
}

async function updateItem1(id) {
  const item = await Baza.findById(id);
  if (!item) {
    return
  }
  item.status = "C";
  item.qty = 105;

  const updatedItem = await item.save();
  console.log(updatedItem);
}

async function updateItem2(id) {
  const result = await Baza.update({_id: id}, {
    $set: {
      status: "A",
      qty: 80
    }
  });

  console.log(result);
}

async function deleteItem(id) {
  // const result = await Baza.deleteOne({_id: id}); // deleteMany shartga mos keluvchi barcha hujjatlarni o'chiradi
  // console.log(result); // bunda o`chirilgan hujjat haqida ma'lumot bo'lmaydi.

  const item = await Baza.findByIdAndRemove({_id: id}); // Bu operator hujjatni o'chiradi va uni return qiladi.
  console.log(item);
}

async function run() {
  const items = await getItem();
  console.log(items);
  const item2 = await getItem2();
  console.log(item2);
}

//deleteItem("61a0c597b134f09dfbd86949");
createItem();
