





// this function use to token janret
function Token_janreter_fun(gmail,jwt){
    const Token = jwt.sign(gmail,"SECRETKEY")
    // console.log(NewToken);
    return Token
}

function send_token_to_cookies(res,NewToken){
    var token_to_string = NewToken.toString()
    console.log(NewToken);
    res.cookie('JWT_key',token_to_string,{expires: new Date(Date.now() + 1000000),httpOnly: true},((err)=>{
        try{
            console.log("sucsess");
        }catch(err){
            console.log(err);
        }
    }));
    console.log("Token send to cookies");
}

function get_token_to_cookies(req){
    var TokenCookies = req.cookies.JWT_key;
    console.log(TokenCookies);
    return TokenCookies
}



// This function use to get data
function TodayDate(new_date){
    const date = ("0" + new_date.getDate()).slice(-2);
    const month = ("0" + (new_date.getMonth() + 1)).slice(-2);
    const year = new_date.getFullYear();
    return year + "-" + month + "-" + date
}

// var date = TodayDate()
// console.log(date);

// This function use to get time
function Time(new_date){
    const hours = new_date.getHours();
    const minutes = new_date.getMinutes();
    const seconds = new_date.getSeconds();
    return hours + ":" + minutes + ":" + seconds
}

// var time = Time();
// console.log(time);


function sign_up_page_function(res){
    res.sendFile(__dirname + "/" + "/Htmlfile/SignUpPage.html");
}

function login_page_function(res){
    res.sendFile(__dirname + "/" + "/Htmlfile/LoginPage.html");
}

function create_post_function(res){
    res.sendFile(__dirname + "/" + "/Htmlfile/CreatePost.html");
}

function like_dislike_page_function(res){
    res.sendFile(__dirname + "/" + "/Htmlfile/LikeDislikePage.html");
}

function total_user_information_function(res){
    res.sendFile(__dirname + "/" + "/Htmlfile/TotalUserInformation.html");
}






module.exports ={
                    Token_janreter_fun,
                    send_token_to_cookies,
                    get_token_to_cookies,
                    TodayDate,Time,
                    sign_up_page_function,
                    login_page_function,
                    create_post_function,
                    like_dislike_page_function,
                    total_user_information_function
                };