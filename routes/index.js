var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")

/* GET home page. */
router.get('/', function (req, res, next) {
  let files = fs.readdirSync(
    path.join(__dirname, "..", "public", "filesystem")
  )
  res.render('index', { files, filedata: null, filename:null  });
});

router.post('/create', function (req, res, next) {
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "filesystem", req.body.filename), "Write text here "
  );

  res.redirect("/file/" + req.body.filename);

});

router.get('/file/:filename', function (req, res, next) {
  let files = fs.readdirSync(
    path.join(__dirname, "..", "public", "filesystem")
  )
  let filedata = fs.readFileSync(
    path.join(__dirname, "..", "public", "filesystem", req.params.filename), "utf-8"
  );
  res.render('index', { files, filedata, filename:req.params.filename });

});

router.get('/delete/:filename', function (req, res, next) {
  fs.unlinkSync(
    path.join(__dirname, "..", "public", "filesystem", req.params.filename)
  );
  res.redirect('/');

});

router.post('/update/:filename', function (req, res, next) {
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "filesystem", req.params.filename), req.body.filedata
  );

  res.redirect("/file/" + req.params.filename);

});



module.exports = router;
