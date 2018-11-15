var express = require("express"),
	User    = require("../models/user");
var router = express.Router();

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

router.post("/viewmessage",function(req,res){
	res.render("message/viewmessage",{talkingto:req.body.test});
});

module.exports = router;
