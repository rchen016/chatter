var express = require("express")
	mongoose = require("mongoose"),
	bodyParser = require("body-parser");
var app = express();


var MessageSchema = mongoose.model("Message",{
	name: String,
	message : String
});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//var url = "mongodb://rcrc:zx1230321@ds161183.mlab.com:61183/chatapp";
mongoose.connect("mongodb://localhost/chat_app");
app.get("/",function(req,res){
	res.render("index.ejs");
});

app.get("/message", function(req,res){
	MessageSchema.find({},function(err,found){
		res.send(found);
	});
});

app.post("/message",function(req,res){
	console.log("holla");
	var name = "dsgsddfsfs";
	var text = req.body.message;
	MessageSchema.create({name:name,message:text},function(err){
	 	if(err){
			console.log("er");
		}
	});
	res.redirect("back");
	return;
});

app.listen(3000, process.env.IP, function(){
  console.log("Server Up...");
});
