const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/schedusendDatabase")
.then(()=>{
    console.log("Connection successful!");
}).catch((err)=>{
    console.log(err);
});