var express = require("express"),
	User    = require("../models/user");
var router = express.Router();
var http = require("http").Server(router);
var io = require("socket.io")(http);

//socketio
io.on("connection", () =>{
 console.log("a user is connected");
});

//

router.get("/", function(req,res){
	Message.find({},function(err,found){
		res.send(found);
	});
});

router.post("/",function(req,res){
	io.emit('message', "tesNNJNt");
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
			console.log("Send To ",req.body.sendTo);
			console.log("FOUND: ",found[0]);
			found[0].messageLog.push(created);
			found[0].save();
			req.flash("success","Sent");
			res.redirect("/");
			return;
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
