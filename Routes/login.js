module.exports = (app,jwt,knex,urlencodedParser,function_call)=>{
    app.post("/login",urlencodedParser,async(req,res)=>{
        const gmail = {Gmail:req.body.Gmail};
        var NewToken = await function_call.Token_janreter_fun(gmail,jwt);
        const Token_Send_to_Cookies = await function_call.send_token_to_cookies(res,NewToken);
        // const Token_get_to_Cookies = await function_call.get_token_to_cookies(req);
        // console.log(Token_get_to_Cookies);
        // if(TokenCookies != undefined){
        //     const verifyUser = jwt.verify(TokenCookies,"SECRETKEY",(err,cookie)=>{
        //         if(err){
        //             console.log(err);
        //         }else{
        //             knex
        //                 .select("*")
        //                 .from("UserInformations")
        //                 .where("Gmail",req.body.Gmail)
        //                 .then((Data)=>{
        //                     // console.log(Data[0].Password);
        //                     if(Data[0].Password == req.body.Password){
        //                         console.log('password chek sucsessful');
        //                         function_call.create_post_function(res);
        //                     }else{
        //                         function_call.sign_up_page_function(res);
        //                     }
        //                 }).catch((err)=>{
        //                     console.log(err);
        //                 })
        //         }
        //     }) 
        // }else{
        //     console.log("Token got undefined");
        // }
    })
}