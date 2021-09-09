import dotenv from "dotenv";
import express from "express"
import app from "./app.js";

dotenv.config();

app.use(express.static("./public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
