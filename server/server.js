require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const { default: mongoose } = require("mongoose");

mongoose.connect(
  "mongodb+srv://kusaraju202:kOeb4KYKJRxBjKRI@cluster0.3m85fgj.mongodb.net/Recipes",
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

function generateRefreshToken(user) {
  const refreshToken = jwt.sign({ username: user.username }, secretKey);
  refreshTokens.push(refreshToken);
  return refreshToken;
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}

app.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const HashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: HashedPassword,
      email,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in signup", error);
    res.status(500).json({ message: "Interval server error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
