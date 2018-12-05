var express = require("express"),
	User    = require("../models/user");
var router = express.Router();
var http = require("http").Server(router);
var io = require("socket.io")(http);


router.get("/", function(req,res){
	//find the current user's message log
	User.find({
		"username":{
			"$regex":req.user.username,
			"$options": "i"
		}
	},function(err,found){

//console.log(Object.getOwnPropertyNames(found[0].messageLog[0]));
//		console.log("log checker: ",found[0].messageLog[0].sendTo);
		res.send(found[0].messageLog);
	});
});

router.post("/", async function(req,res){
	var sendTo = req.body.sendTo;
	var sender = req.user.username;
	var text = req.body.sendmessage;
	console.log("Enter /message");
	console.log("Who?: ",req.body.sendTo);
	console.log("MSG?: ",req.body.sendmessage);
	console.log("USER: ",req.user.username);
	Message.create({sendTo:sendTo,sender:sender,message:text},function(err,created){
	 	if(err){
			req.flash("error",error);
			res.redirect("back");
			return;
		}
		req.user.messageLog.push(created);
		req.user.save();
		User.find({
			"username":{
				"$regex":req.body.sendTo,
				"$options": "i"
			}
		},function(err,found){
			if(err){
				req.flash("error", "No User Found");
			}
			//console.log("Send To ",req.body.sendTo);
			//console.log("FOUND: ",found[0]);
		//	console.log(messageTest);
			found[0].messageLog.push(created);
			found[0].save();
			// console.log("right before emit");
			// req.flash("success","Sent");
			// res.redirect("/");
			// return;
		});
	});
});

router.get("/chatlist",function(req,res){
	res.render("message/chatlist");
});

router.post("/:id/viewmessage",function(req,res){
	res.render("message/viewmessage",{talkingto:req.body.sendTo});
});

//module.exports = router;
module.exports= router;
