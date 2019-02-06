var express          = require("express")
	mongoose         = require("mongoose"),
	Message          = require("./models/message"),
	passport         = require("passport"),
	LocalStrategy    = require("passport-local"),
	path             = require("path"),
	User             = require("./models/user"),
	methodOverride   = require("method-override"),
	flash            = require("connect-flash"),
	bodyParser       = require("body-parser");
var app = express();
var messageRoutes    = require("./routes/message"),
    friendRoutes     = require("./routes/friend"),
    indexRoutes      = require("./routes/index");

	var http = require("http").Server(app);
	var io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine","ejs");
app.use(flash());
//Passport
app.use(require("express-session")({
	secret: "testtesttest",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.socketio = io;
	res.locals.saveMessage = "";
	next();
});
//
//var url = "mongodb://rcrc:zx1230321@ds161183.mlab.com:61183/chatapp";
// mongoose.connect("mongodb://localhost/chat_app");

var url = process.env.DATABASEURL || "mongodb://localhost/chat_app";
//var url =  "mongodb://localhost/chat_app";
mongoose.connect(url);

app.use("/message",messageRoutes);
app.use(indexRoutes);
app.use(friendRoutes);

io.on("connection",function(socket){
	socket.join("localb");
	socket.on('disconnect', () => {
		console.log('user disconnected ',socket.id);
	});

	console.log('New user connected ',socket.id);

	//default username
	socket.username = ""

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.sendmessage, sendTo: data.sendTo, sender:data.sender});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {sid : socket.id})
    })

	io.to("localb").emit("B");
	io.to("locala").emit("A");
});

var server = http.listen(process.env.PORT||3000, process.env.IP, function(){
  console.log("Server Up...");
});
