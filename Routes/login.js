module.exports = (app,jwt,knex,urlencodedParser)=>{
    app.post("/login",urlencodedParser,(req,res)=>{
        // console.log(req.body);
        knex.select("*").from("UserInformation").then((RowData)=>{
            var notExsist = 0;
            for(row of RowData){
                if(row.Gmail == req.body.Gmail && row.Password == req.body.Password){
                    notExsist = 1
                    verify()
                }
            }
            if(notExsist == 0){
                res.end(JSON.stringify("First do SignUp"));
            }
        })

        async function verify(){
            try{
                var tokenJanretar = {Gmail: req.body.Gmail};
                const NewToken =  await jwt.sign({tokenJanretar},process.env.SECRET_KEY)
                // console.log("this is janret tokem" , NewToken);
                
                var cooki = await res.cookie("TokenJWT",NewToken,{expires: new Date(Date.now() + 1000000),httpOnly: false},(err)=>{
                    if(err){
                        console.log(err);
                    }
                });

                const TokenCookies = await req.cookies.TokenJWT; 
                // console.log(TokenCookies);           
        
                const verifyUser = jwt.verify(TokenCookies,process.env.SECRET_KEY,(err,cookie)=>{
                    if(err){
                        res.end(JSON.stringify(err));
                    }else{
                        knex.select("*").from("UserInformation").then((UserDataByDatabes)=>{
                            for(userinfo of UserDataByDatabes){
                                var nameUser = userinfo.Name;
                                var gmailUser = userinfo.Gmail
                                if(userinfo.Gmail == req.body.Gmail && userinfo.Password == req.body.Password){
                                    res.sendFile(__dirname + "/" + "./CreatePost.html");
                                }
                            }
                        }).catch((err) => { console.log( err); throw err })
                        
                    }
                });
    
            } catch(error){
                res.status(401).send(error);
            }                
        }
    })
}