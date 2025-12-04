import mongoose from "mongoose";

// const URI = "mongodb://127.0.0.1:27017/authdb";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
