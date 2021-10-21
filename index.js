const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(formidableMiddleware());

cloudinary.config({
  cloud_name: "dnb9zss29",
  api_key: "136614577146229",
  api_secret: "9AxHyqwroukAs8B5H8X8hze6CaI",
});

mongoose.connect("mongodb://localhost/vinted", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userRoutes = require("./routes/user");
app.use(userRoutes);

const offerRoutes = require("./routes/offer");
app.use(offerRoutes);

app.all("*", (req, res) => {
  res.json("All Routes");
});

app.listen(3000, () => {
  console.log("serv up and running");
});
