var express = require("express");

var router = express.Router();

router.get("/friendRequest",function(req,res){
	res.render("friend/request");
});

module.exports = router;
