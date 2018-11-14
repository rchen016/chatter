var express = require("express"),
    User    = require("../models/user");

var router = express.Router();

router.get("/friendRequest",function(req,res){
	res.render("friend/request");
});

router.post("/friendRequest",function(req,res){
	console.log(req.body.username);
	// User.find({},function(err,found){
	// 	console.log("People");
	// 	for(var i=0;i<found.length;i++){
	// 		console.log(found[i]);
	// 		if(found[i].username==req.body.username){
	// 			req.user.friendReqList.push(found[i]);
	// 			req.user.save();
	// 			res.redirect("/");
	// 			return;
	// 		}
	// 	}
	// });
	User.find({
		"username":{
			"$regex": req.body.username,
			"$options": "i"
		}
	},function(err,found){
		if(err){
			req.flash("error", "No User Found");
		}
		console.log(found);
		// console.log("??????????");
		// req.user.friendReqList.push(found);
		// console.log("??????????");
		// req.user.save();
		// console.log("??????????");
		res.render("friend/request");
		return;
	});
});

module.exports = router;
