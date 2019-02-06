var express = require("express"),
    User    = require("../models/user");

var router = express.Router();
var http = require("http").Server(router);
var io = require("socket.io")(http);
router.get("/friendRequest",function(req,res){
	res.render("friend/request");
});

router.post("/friendRequest",function(req,res){
	var userIndex = 0;
	User.find({
		"username":{
			"$regex": req.body.username,
			"$options": "i"
		}
	},function(err,found){
		if(err){
			req.flash("error", "No User Found");
		}
		console.log("Request User Found: ",found);
		//find the correct user to add
		for(var i=0;i<found.length;i++){
			console.log("check found list",found[i].username);
			console.log("requester ",req.user.username);
			if(found[i].username==req.body.username){
				userIndex=i;
			}
		}
		//verify hasn't already added
		for(var i=0; i< found[userIndex].friendReqList.length; i++){
			console.log("1: ",found[userIndex].friendReqList[i]);
			console.log("2: ",req.user.username);
			if(found[userIndex].friendReqList[i]==req.user.username){
				req.flash("error", "Already Requested");
				res.locals.error = req.flash("error");
				res.render("friend/request");
				return;
			}
		}
		console.log("Requested:!!  ", found[userIndex].username);
		found[userIndex].friendReqList.push(req.user.username);
		found[userIndex].save();
		req.flash("success", "Requested");
		res.locals.success = req.flash("success");
		res.render("friend/request");
		return;
	});
});

router.post("/addFriend",function(req,res){
	var counter = 0;
	console.log(req.body.addfriend);
	User.find({
		"username":{
			"$regex": req.body.addfriend,
			"$options": "i"
		}
	},function(err,found){
		console.log("Found: ",found);
		if(err){
			req.flash("error", "No User Found");
		}

		console.log("Request User Found1: ",found);
		req.user.friendReqList.forEach(function(found){
			if(req.body.addfriend == found){
				req.user.friendReqList.splice(counter,1);
			}
			counter = counter + 1;
		});
		req.user.friendList.push(req.body.addfriend);
		req.user.save();
		found[0].friendList.push(req.user.username);
		found[0].save();
		req.flash("success", "Added!");
		res.locals.success = req.flash("success");
		res.render("friend/request");
		return;
	});
});


module.exports = router;
