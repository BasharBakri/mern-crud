const mongoose = require('mongoose');




const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(process.env.MONGO_URI);



  console.log(`connected MongoDB: ${conn.connection.host}`);
};





module.exports = connectDB;