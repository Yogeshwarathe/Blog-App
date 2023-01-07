module.exports = (app,jwt,knex,urlencodedParser,function_call)=>{
    app.post("/login",urlencodedParser,async(req,res)=>{
        var NewToken = await function_call.Token_janreter_fun({Gmail:req.body.Gmail},jwt);
        // console.log(NewToken);
        var send_token_to_cookies = await res.cookie('JWT_key',NewToken,{expires: new Date(Date.now() + 1000000),httpOnly: true});

        var TokenCookies = await req.cookies.JWT_key;
        console.log(TokenCookies);
        if(TokenCookies != undefined){
            const verifyUser = jwt.verify(TokenCookies,"SECRETKEY",(err,cookie)=>{
                if(err){
                    console.log(err);
                }else{
                    knex
                        .select("*")
                        .from("UserInformation")
                        .where("Gmail",req.body.Gmail)
                        .then((Data)=>{
                            // console.log(Data[0].Password);
                            if(Data[0].Password == req.body.Password){
                                console.log('password chek sucsessful');
                                function_call.create_post_function(res);
                            }else{
                                function_call.sign_up_page_function(res);
                            }
                        }).catch((err)=>{
                            console.log(err);
                        })
                }
            }) 
        }else{
            console.log("Token got undefined");
        }
    })
}