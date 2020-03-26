var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const got = require("got");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {  
  res.sendFile(path.join(__dirname + "/src/views/index.html"));
});

app.post("/exists", async (req,res,next) =>{
  let url =  req.body.url

  try {
    const response = await got(`https://www.${url}`);
    if (response.body) {
      console.log(200);
      res.sendStatus(200);
      return;
    }

  } catch (error) {
    console.log(error.code);
    if (error.code === "ENOTFOUND") {
      console.log(404,' - not found');
      res.sendStatus(404);
      return;
    }
    else{
      console.log(500, " - internal server error");
      res.sendStatus(500);
      return;
    }
  }
  
})

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
