var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
	sendTo: String,
	sender: String,
	message: String
});

module.exports = mongoose.model("Message", messageSchema);
