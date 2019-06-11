//jshint esversion:6

const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var request = require('request');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));


app.get("/",function(req,res){

res.sendFile(__dirname + "/signup.html");

});

app.post("/",function(req,res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
    {
      email_address : email,
      status: "subscribed",
      merge_fields: {
        "FNAME": firstName,
        "LNAME": lastName
      }



  }


    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {

  url : "https://us20.api.mailchimp.com/3.0/lists/7c8eaaf2f6",
  method : "POST",
  headers : {
    "Authorization" : "tejas e3371d4d282631b29c1a0330be7b15bd-us20"
  } ,
  body : jsonData
  };

  request(options, function(error, response, body){

  if(error){
    console.log(error);
    res.sendFile(__dirname + "/failure.html");
  }else{
    if (response.statusCode == 200){
    res.sendFile(__dirname + "/success.html");

  }else{
   res.sendFile(__dirname + "/failure.html");

  }

  }


  });


console.log(firstName + " " + lastName + " " + email);

});

app.post("/failure",function(req,res){

res.redirect("/");

});

app.listen(process.env.PORT || 3000, function() {

  console.log("Server is running on port 3000");

});

// e3371d4d282631b29c1a0330be7b15bd-us20

// 7c8eaaf2f6
