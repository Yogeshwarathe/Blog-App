module.exports = (app,jwt,knex,urlencodedParser,fun_coll)=>{
    app.post("/login",urlencodedParser,async(req,res)=>{
        var NewToken = await fun_coll.Token_janreter_fun({Gmail:req.body.Gmail},jwt);
        var resposns = await res.cookie("TokenJWT",NewToken,{expires: new Date(Date.now() + 1000000),httpOnly: true},((err)=>{
            console.log(err);
        }))
        var TokenCookies = await req.cookies.TokenJWT;
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
                                res.end(JSON.stringify("login "))
                            }
                        }).catch((err)=>{
                            console.log(err);
                        })
                }
            }) 
        }
    })
}