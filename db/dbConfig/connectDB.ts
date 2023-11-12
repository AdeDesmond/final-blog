import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongoose db connected successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "mongodb connection error. please make sure mongodb is runnng" + err
      );
      process.exit();
    });
  } catch (err) {
    console.log("something we wrong");
    console.log(err);
  }
};

export { connectDB };
