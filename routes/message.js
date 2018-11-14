var express = require("express");
var router = express.Router();

router.get("/", function(req,res){
	Message.find({},function(err,found){
		res.send(found);
	});
});

router.post("/",function(req,res){
	console.log("holla");
	var name = "dsgsddfsfs";
	var text = req.body.message;
	Message.create({name:name,message:text},function(err){
	 	if(err){
			console.log("er");
		}
	});
	res.redirect("back");
	return;
});

router.get("/chatlist",function(req,res){
	res.render("message/chatlist");
});

module.exports = router;
