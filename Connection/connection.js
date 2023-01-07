
// this function use to token janret
function Token_janreter_fun(Gmail,jwt){
    const Token = jwt.sign({Gmail},"SECRETKEY")
    // console.log(NewToken);
    return Token
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
                    TodayDate,Time,
                    sign_up_page_function,
                    login_page_function,
                    create_post_function,
                    like_dislike_page_function,
                    total_user_information_function
                };