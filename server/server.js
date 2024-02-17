require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

const SingupLoginroutes = require('./routes/LoginSignup')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const { default: mongoose } = require("mongoose");



mongoose.connect(
  process.env.CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


app.get("/", (req, res) => {
  res.send("HII");
});

// function generateRefreshToken(user) {
//   const refreshToken = jwt.sign({ username: user.username }, secretKey);
//   refreshTokens.push(refreshToken);
//   return refreshToken;
// }

// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
// }



app.use("/", SingupLoginroutes);


app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
