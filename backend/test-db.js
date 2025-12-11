import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/lyricsDB")
  .then(() => {
    console.log("Connected!");
    process.exit();
  })
  .catch(err => {
    console.log("Connection error:", err);
    process.exit();
  });
