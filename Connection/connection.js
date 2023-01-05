// this function use to token janret
function Token_janreter_fun(Gmail,jwt){
    const Token = jwt.sign({Gmail},"SECRETKEY")
    // console.log(NewToken);
    return Token
}
// var NewToken = Token_janreter_fun({Gmail:"yogesh@gmail.com"});
// console.log(fun1);

                                           

// This function use to get data
function TodayDate(){
    const date_ob = new Date();
    const date = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    return year + "-" + month + "-" + date
}

// var date = TodayDate()
// console.log(date);

// This function use to get time
function Time(){
    const date_ob = new Date();
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    return hours + ":" + minutes + ":" + seconds
}

// var time = Time();
// console.log(time);



module.exports = {Token_janreter_fun,TodayDate,Time};