const mongoose = require('mongoose');

const mon = ()=>{ 
  mongoose.connect('mongodb://localhost:27017/torch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
     console.log("database connected")
    });
}

module.exports = mon;


