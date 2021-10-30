// BASIC CONFIGURATION AND REQUIREMENTS

var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
require('dotenv').config()
var app = express();


var func = bodyParser.urlencoded({ extended: false });
app.use(func);

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});



// SETUP OF MULTER PACKAGE FOR PROJECT
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Handle uploading of file named 'upfile'
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (req.file === undefined) { // if no file chosen yet tried to upload.
    return res.send("Choose file to upload.");
  }
  const file = req.file;
  res.json({name: file.originalname, type: file.mimetype, size: file.size});
})



