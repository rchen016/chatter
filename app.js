var express = require("express")
	mongoose = require("mongoose"),
	Message = require("./models/message");
	bodyParser = require("body-parser");
var app = express();
var messageRoutes    = require("./routes/message");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//var url = "mongodb://rcrc:zx1230321@ds161183.mlab.com:61183/chatapp";
mongoose.connect("mongodb://localhost/chat_app");
app.get("/",function(req,res){
	res.render("index.ejs");
});

app.use("/message",messageRoutes);

app.listen(3000, process.env.IP, function(){
  console.log("Server Up...");
});
