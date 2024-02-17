require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require('path')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Specify the destination folder
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix); // Set the file name
    },
  });
  
  const upload = multer({ storage: storage });

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

app.use("/", SingupLoginroutes);


app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file)
    const fileUrl = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
    console.log(fileUrl)
    res.json({ fileUrl });
});



app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
