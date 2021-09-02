
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const express = require('express');
const session = require("express-session");
const expressLayouts = require('express-ejs-layouts');


const app = express();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const orgRouter = require("./routes/organization");
const dashboardRouter = require("./routes/dashboard");


//DB Config
const dbURI= require('./config/keys').MongoURI;

//Passport Config
require('./config/passport')(passport);

//Connect to Mongo
mongoose.connect(
dbURI, { useNewUrlParser: true }
);
mongoose.connection.once('open', function(){
  console.log('MongoDB connection made!');
}).on('error',function(error){
  console.log('Connection error', error);
})


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended:false}));

//Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global Vars
app.use( (req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use("/org", orgRouter);
app.use("/org-dashboard", dashboardRouter);
app.use('/static', express.static('static'))



const PORT =process.env.PORT|| 8000;
app.listen(PORT,console.log(`Server started on port ${PORT}`));