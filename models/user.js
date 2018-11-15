var mongoose = require("mongoose"),
 passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	friendList: {
		type: Array,
		"default": [Object]
	},
	friendReqList: {
		type: Array,
		"default": [Object]
	},
	messageLog:{
		type: Array,
		"default": [Object]
	}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
