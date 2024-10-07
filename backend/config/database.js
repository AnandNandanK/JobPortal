import mongoose from 'mongoose';

import dotenv from "dotenv";
dotenv.config({});


// console.log("MONGODB_URL......",process.env.MONGODB_URL);

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Optional: Exit the process if the database connection fails
  }
};

export default connectdb;
