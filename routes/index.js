var express = require("express");

var router = express.Router();

router.get("/",function(req,res){
	if(req.user){
		res.redirect("message/chatlist");
	}
	else{
		res.render("login");
	}
});

//Login
router.get("/login",function(req,res){
	res.render("login",{message:req.flash("error")});
});

router.post("/login", passport.authenticate("local",
	{
		successRedirect: "message/chatlist",
		failureRedirect: "/login"
	}),function(req,res){
});

//Sign Up
router.get("/register",function(req,res){
	res.render("register");
});


router.post("/register",function(req,res){
	if(req.body.password != req.body.confirmPassword){
		req.flash("error", "Passwords Don't match!");
		res.redirect("back");
		return;
	}
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error", err);
			return res.render("register");
		}
		else{
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Account Created");
				res.redirect("/");
			});
		}
	});
});

//Logout
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success", "Sucessfully Logged Out!");
	res.redirect("/login");
});

module.exports = router;
