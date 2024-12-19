const mongoose=require('mongoose');  // Import the mongoose library for MongoDB interaction

// Load environment variables from the .env file
require('dotenv').config();

// Retrieve the MongoDB connection URL from environment variables
const mongo_url=process.env.mongo_url;




// Function to connect to the MongoDB database
const connectDB=async()=>{
  try{
  await mongoose.connect(mongo_url );
  console.log('Mongodb connected');
}
catch(error){
    console.log(error);
    process.exit(1);
  }
}

module.exports=connectDB;