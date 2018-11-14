var express = require("express");

var router = express.Router();

router.get("/",function(req,res){
	res.render("index.ejs");
});

//Login
router.get("/login",function(req,res){
	res.render("login.ejs");
});

router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/",
		failureRedirect: "/login"
	}),function(req,res){
});

//Sign Up
router.get("/register",function(req,res){
	res.render("register.ejs");
});


router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log("welp");
		}
		else{
			passport.authenticate("local")(req, res, function(){
				res.redirect("/");
			});
		}
	});
});

//Logout
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

module.exports = router;
