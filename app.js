var express = require("express")
	mongoose = require("mongoose"),
	Message = require("./models/message"),
	passport         = require("passport"),
	LocalStrategy    = require("passport-local"),
	path             = require("path"),
	User             = require("./models/user")
	bodyParser = require("body-parser");
var app = express();
var messageRoutes    = require("./routes/message"),
    indexRoutes      = require("./routes/index");

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine","ejs");
//Passport
app.use(require("express-session")({
	secret: "testtesttest",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});
//
//var url = "mongodb://rcrc:zx1230321@ds161183.mlab.com:61183/chatapp";
mongoose.connect("mongodb://localhost/chat_app");

app.use("/message",messageRoutes);
app.use(indexRoutes);

app.listen(3000, process.env.IP, function(){
  console.log("Server Up...");
});
