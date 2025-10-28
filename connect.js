const mongoose = require("mongoose");

const connectDB = async (url) => {
    console.log(url)
    await mongoose.connect(url)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB", err);
    });
}

module.exports = {connectDB};