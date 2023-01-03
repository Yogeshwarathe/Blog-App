module.exports = (app,jwt,knex,urlencodedParser)=>{
    app.post("/get_likeDislike",urlencodedParser,(req,res)=>{
        // console.log(req.body);
        async function userLike(){
            var TokenCookies = await req.cookies.TokenJWT;
            // console.log(TokenCookies);
            SECRET_KEY1 = String(process.env.SECRET_KEY)
            const decoding = await jwt.decode(TokenCookies,SECRET_KEY1);
            // console.log(decoding);
            const DecodGmailId = decoding.tokenJanretar.Gmail;
            // console.log(DecodGmailId);

            knex.select("*").from("CreatePostTable").then((RawData)=>{
                for(row of RawData){
                    if(row.Gmail == DecodGmailId){
                        // console.log(row.Discription);
                        var TextUser = row.Text;
                        var DiscriptionUser = row.Discription;
                        
                        knex.select("*").from("LikeDislikeTable").then((Data)=>{
                            var userLikeDislike = 0;
                            for(info of Data){
                                if(info.Gmail == DecodGmailId){
                                    userLikeDislike = 1
                                    aditionLike = info.Like + req.body.Like;
                                    aditionDislike = info.Dislike + req.body.Dislike;
                                    info.Like = aditionLike
                                    info.Dislike = aditionDislike
                                    knex("LikeDislikeTable").where({Gmail:info.Gmail}).update({Like: aditionLike,Dislike: aditionDislike}).then((data)=>{
                                        console.log('Done');
                                        // document.write("");
                                        res.end(JSON.stringify({Gmail:info.Gmail,Like:aditionLike,Dislike:aditionDislike}))
                                        // res.sendFile(__dirname + "/" + "./TotalUserInformation.html");

                                        res.end(JSON.stringify("like & dislike updated "));
                                    

                                    }).catch((err)=>{
                                        console.log(err);
                                    })
                                    break
                                }
                            }

                            if(userLikeDislike == 0){
                                const userLikeDislike = {UserId: row.UserId,PostId:row.Id,Gmail:row.Gmail,Like: req.body.Like,Dislike: req.body.Dislike};
                                // console.log(userLikeDislike);
                                knex("LikeDislikeTable").insert(userLikeDislike).then(()=>{
                                    // res.sendFile(__dirname + "/" + "./TotalUserInformation.html");
                                    // res.end(JSON.stringify("Like & Dislike insert sucsesfull"))
                                    console.log("Like & Dislike insert sucsesfull");
                                    res.end(JSON.stringify({Gmail:row.Gmail,Like: req.body.Like,Dislike: req.body.Dislike}))
                                }).catch((err)=>{
                                    res.end(JSON.stringify(err));
                                })
                            }
                        })
                    }
                }
            })
        }
        userLike()   
    })
}