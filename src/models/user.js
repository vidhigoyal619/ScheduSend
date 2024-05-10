const mongoose = require("mongoose");


const schedusendSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/ // Basic email format validation
    },
    phone:{
        type: String, 
        required: true
    },
    password:{
        type: String,
        required: true,
        
    },
    Message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message' // Reference to the survey response model
    }]
});

const UserDetails = mongoose.model( "UserDetails", schedusendSchema ); 
module.exports = UserDetails;
