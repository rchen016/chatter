var mongoose = require("mongoose"),
 passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	friendList: {
		type: Array
	},
	friendReqList: {
		type: Array
	},
	messageLog:{
		type: Array
	}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
