var express = require("express"),
	User    = require("../models/user");
var router = express.Router();
var http = require("http").Server(router);
// var io = require("socket.io")(http);


router.get("/", function(req,res){
	Message.find({},function(err,found){
		res.send(found);
	});
});

router.post("/",function(req,res){
	var sendTo = req.body.sendTo;
	var sender = req.user.username;
	var text = req.body.message;
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
			const io = res.locals.socketio;
			io.on("connection",function(socket){
				console.log('Message JS');

			});
			//console.log("Send To ",req.body.sendTo);
			//console.log("FOUND: ",found[0]);
		//	console.log(messageTest);
			found[0].messageLog.push(created);
			found[0].save();
			console.log("right before emit");
			io.emit('message', req.body);
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

module.exports = router;
