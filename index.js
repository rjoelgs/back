const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const guitarRoute = require("./routes/Guitarra.route");
const userRoute = require("./routes/User.route");
const authRoute = require("./routes/Auth.route");
const productRoute = require("./routes/Products.route");




const port = process.env.PORT;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL);

app.use(express.json());
app.use(cors());
app.use("/guitars", guitarRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/products",productRoute);

app.get("/", (req, res)=>{
  res.json({
    "res": "ok"
  })
})

app.listen(port, ()=>{
  console.log(`server is running on ${port}`);

  //encrypt("647471.Mdb");
  //const token = generateToken();
  //console.log("TOKEN", token);

  //const infoToken = readToken(token);
  //console.info(infoToken);
});

//TTL = Time To Live 
