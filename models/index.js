require("dotenv").config();
import mongoose from "mongoose";

//connect to database
const mongoConnectionURL = `mongodb+srv://rishav:${process.env.DB_PASSWORD}@cluster-0.smaef.mongodb.net/vocab_db?retryWrites=true&w=majority`;
const databaseName = "vocab_db";

const connectDB = () => {
  try {
    mongoose
      .connect(mongoConnectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: databaseName,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
