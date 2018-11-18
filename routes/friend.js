var express = require("express"),
    User    = require("../models/user");

var router = express.Router();

router.get("/friendRequest",function(req,res){
	res.render("friend/request");
});

router.post("/friendRequest",function(req,res){
    //find requested user
	User.find({
		"username":{
			"$regex": req.body.username,
			"$options": "i"
		}
	},function(err,found){
		if(err){
			req.flash("error", "No User Found");
            res.redirect("back");
    		return;
		}
        //ensure user exist
        if(found[0]==undefined){
            req.flash("error", "No User Found");
            res.locals.error = req.flash("error");
            res.redirect("back");
    		return;
        }
        //check if requested already
		for(var i=0; i< found[0].friendReqList.length; i++){
			console.log("1: ",found[0].friendReqList[i]);
			console.log("2: ",req.user.username);
			if(found[0].friendReqList[i]==req.user.username){
				req.flash("error", "Already Requested");
				res.locals.error = req.flash("error");
				res.render("friend/request");
				return;
			}
		}
		found[0].friendReqList.push(req.user.username);
		found[0].save();
		req.flash("success", "Requested");
		res.locals.success = req.flash("success");
		res.redirect("/friendRequest");
		return;
	});
});

router.post("/addFriend",function(req,res){
	var counter = 0;
	//find friend to add
	User.find({
		"username":{
			"$regex": req.body.addfriend,
			"$options": "i"
		}
	},function(err,found){
        //ensure user exist
        if(found[0]==undefined){
            req.flash("error", "No User Found");
            res.locals.error = req.flash("error");
            res.redirect("back");
    		return;
        }
		if(err){
			req.flash("error", "No User Found");
            res.redirect("back");
    		return;
		}
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
