const app= require("./backend/app")
const express = require("express");
const { connectDatabse } = require("./backend/config/database")

const cloudinary = require("cloudinary")
const ap = express();
const path = require("path");
connectDatabse()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


ap.use(express.static(path.join(__dirname, "./frontend/build")));

ap.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})