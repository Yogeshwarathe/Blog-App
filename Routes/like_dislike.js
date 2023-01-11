module.exports = (app,jwt,knex,urlencodedParser,function_call)=>{
    app.post("/like_dislike",urlencodedParser,async(req,res)=>{
        var TokenCookies = await req.cookies.TokenJWT;
        // console.log(TokenCookies);
        const decoding = await jwt.decode("SECRETKEY");
        // console.log(decoding);
        const DecodGmailId = decoding.tokenJanretar.Gmail;
        // console.log(DecodGmailId);
        knex
            .select("*")
            .from("CreatePostTables")
            .where("Gmail",DecodGmailId)
            .then((PostData)=>{
                knex
                    .select("*")
                    .from("LikeDislikeTables")
                    .where("Gmail",DecodGmailId)
                    .then((Data)=>{
                        // console.log(Data);
                        if(Data[0] != undefined){
                            if(Data[0].Gmail == DecodGmailId){
                                aditionLike = Data[0].Like + req.body.Like;
                                aditionDislike = Data[0].Dislike + req.body.Dislike;
                                knex("LikeDislikeTables")
                                    .where({Gmail:Data[0].Gmail})
                                    .update({Like: aditionLike,Dislike: aditionDislike})
                                .   then((data)=>{
                                        console.log('like & Dislike updated sucsessfull');
                                        // res.end(JSON.stringify({Gmail:Data[0].Gmail,Like:aditionLike,Dislike:aditionDislike}))
                                        function_call.total_user_information_function(res)
                                    }).catch((err)=>{
                                        console.log(err);
                                    })
                                }
                        }else{
                            const userLikeDislike = {
                                                        UserId: PostData[0].UserId,
                                                        PostId:PostData[0].Id,
                                                        Gmail:PostData[0].Gmail,
                                                        Like: req.body.Like,
                                                        Dislike: req.body.Dislike
                                                    };
                            // console.log(userLikeDislike);
                            knex("LikeDislikeTables")
                                .insert(userLikeDislike)
                                .then(()=>{
                                    console.log("Like & Dislike insert sucsesfull");
                                    function_call.total_user_information_function(res)
                                    // res.end(JSON.stringify({Gmail:PostData[0].Gmail,Like: req.body.Like,Dislike: req.body.Dislike}))
                                }).catch((err)=>{
                                    console.log(err);
                                    // res.end(JSON.stringify(err));
                            })
                        }              
                    })
            }) 
    })
}