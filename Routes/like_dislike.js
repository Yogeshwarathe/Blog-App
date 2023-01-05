module.exports = (app,jwt,knex,urlencodedParser)=>{
    app.post("/like_dislike",urlencodedParser,async(req,res)=>{
        var TokenCookies = await req.cookies.TokenJWT;
        // console.log(TokenCookies);
        const decoding = await jwt.decode("SECRETKEY");
        // console.log(decoding);
        const DecodGmailId = decoding.tokenJanretar.Gmail;
        // console.log(DecodGmailId);
        // const DecodGmailId = "yogesh@gmail.com";
        knex
            .select("*")
            .from("CreatePostTable")
            .where("Gmail",DecodGmailId)
            .then((PostData)=>{
                knex
                    .select("*")
                    .from("LikeDislikeTable")
                    .where("Gmail",DecodGmailId)
                    .then((Data)=>{
                        // console.log(Data);
                        if(Data[0] != undefined){
                            if(Data[0].Gmail == DecodGmailId){
                                aditionLike = Data[0].Like + req.body.Like;
                                aditionDislike = Data[0].Dislike + req.body.Dislike;
                                knex("LikeDislikeTable")
                                    .where({Gmail:Data[0].Gmail})
                                    .update({Like: aditionLike,Dislike: aditionDislike})
                                .   then((data)=>{
                                        console.log('like & Dislike updated sucsessfull');
                                        res.end(JSON.stringify({Gmail:Data[0].Gmail,Like:aditionLike,Dislike:aditionDislike}))
                                        // res.sendFile(__dirname + "/" + "./TotalUserInformation.html");
                                    }).catch((err)=>{
                                        console.log(err);
                                    })
                                }
                        }else{
                            const userLikeDislike = {UserId: PostData[0].UserId,PostId:PostData[0].Id,Gmail:PostData[0].Gmail,Like: req.body.Like,Dislike: req.body.Dislike};
                            // console.log(userLikeDislike);
                            knex("LikeDislikeTable")
                                .insert(userLikeDislike)
                                .then(()=>{
                                    // res.sendFile(__dirname + "/" + "./TotalUserInformation.html");
                                    // res.end(JSON.stringify("Like & Dislike insert sucsesfull"))
                                    console.log("Like & Dislike insert sucsesfull");
                                    res.end(JSON.stringify({Gmail:PostData[0].Gmail,Like: req.body.Like,Dislike: req.body.Dislike}))
                                }).catch((err)=>{
                                    res.end(JSON.stringify(err));
                            })
                        }                 
                    })
            })   
    })
}