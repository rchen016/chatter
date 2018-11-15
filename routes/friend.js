var express = require("express"),
    User    = require("../models/user");

var router = express.Router();

router.get("/friendRequest",function(req,res){
	res.render("friend/request");
});

router.post("/friendRequest",function(req,res){
	User.find({
		"username":{
			"$regex": req.body.username,
			"$options": "i"
		}
	},function(err,found){
		if(err){
			req.flash("error", "No User Found");
		}
		console.log("FOUND: ", found[0].friendReqList);
		found[0].friendReqList.push(req.user);
		console.log("FOUND: ", found[0].friendReqList);
		found[0].save();
		req.flash("success", "Requested");
		res.render("friend/request");
		return;
	});
});

router.post("/addFriend",function(req,res){
	console.log(req.body.test);
	res.send("ADDDD");

});


module.exports = router;
