const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cookieParser =require('cookie-parser');
const fs = require("fs");
const new_date = new Date();



app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.json());


// this is for mysql databases
const knex = require("./models/database");

// open connection file
const function_call = require("./Connection/connection.js");

// routes to open signup page
var get_signupPage = express.Router();
// console.log(signUpPage);
app.use("/",get_signupPage);
require("./Routes/get_signupPage")(get_signupPage,jwt,knex,function_call)


// routes to signup.js
var signup = express.Router();
// console.log(signup);
app.use("/", signup);
require("./Routes/singup")(signup,jwt,knex,urlencodedParser,function_call);

//routes to login
var login = express.Router();
app.use("/",login);
require("./Routes/login")(login,jwt,knex,urlencodedParser,function_call);

//routes to create post
var create_post = express.Router();
app.use("/",create_post);
require("./Routes/create_post")(create_post,jwt,knex,urlencodedParser,function_call,new_date);

//routes to get like & dislike
var like_dislike = express.Router();
app.use("/",like_dislike);
require("./Routes/like_dislike")(like_dislike,jwt,knex,urlencodedParser,function_call);

// routes to get total like dislike
var TotalLike_Dislike = express.Router();
app.use("/",TotalLike_Dislike);
require("./Routes/TotalLike_Dislike")(TotalLike_Dislike,jwt,knex,urlencodedParser);



var server = app.listen(process.env.PORT_NUMBER,"127.0.0.1",function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Search in Google => http://%s:%s", host, port+"/get_signupPage")
    console.log('Server is working')
})

