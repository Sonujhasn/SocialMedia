
const express = require("express");
const { connectDatabse } = require("./config/database")

const express =require("express")
const cookieParser = require("cookie-parser")
const app=express();



//using middleware
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use(cookieParser())

//importing routes
const post=require("./routes/post")
const user=require("./routes/user")

//using routes
app.use("/api/v1",user)
app.use("/api/v1",post)

const cloudinary = require("cloudinary")
const path = require("path");
connectDatabse()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})