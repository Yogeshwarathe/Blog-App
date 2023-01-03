var express = require('express');
var app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cookieParser =require('cookie-parser');



app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.json());



const knex1 = require("./models/database");
// console.log(knex);

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
})
// // console.log(process.env.PASSWORD);



// routes to open signup page
var get_signupPage = express.Router();
// console.log(signUpPage);
app.use("/",get_signupPage);
require("./Routes/get_signupPage")(get_signupPage,jwt,knex)


// routes to signup.js
var signup = express.Router();
// console.log(signup);
app.use("/", signup);
require("./Routes/singup")(signup,jwt,knex,urlencodedParser);

//routes to login
var login = express.Router();
app.use("/",login);
require("./Routes/login")(login,jwt,knex,urlencodedParser);

//routes to create post
var create_post = express.Router();
app.use("/",create_post);
require("./Routes/create_post")(create_post,jwt,knex,urlencodedParser);

//routes to get like & dislike
var Get_LikeDislike = express.Router();
app.use("/",Get_LikeDislike);
require("./Routes/get_like_dislike")(Get_LikeDislike,jwt,knex,urlencodedParser);



var server = app.listen(process.env.PORT_NUMBER,"127.0.0.1",function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Search in Google => http://%s:%s", host, port + "/get_signupPage")
    console.log('Server is working')
})

