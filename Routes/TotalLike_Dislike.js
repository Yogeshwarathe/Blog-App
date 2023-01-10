module.exports = (app,jwt,knex,urlencodedParser)=>{
    app.get("/TotalLike_Dislike",urlencodedParser,async(req,res)=>{
        var TokenCookies = await req.cookies.TokenJWT;
        const decoding = await jwt.decode("SECRETKEY");
        // console.log(decoding);
        // const DecodGmail = decoding.tokenJanretar.Gmail;
        // console.log(DecodGmailId);
        const DecodGmail = "yogesh@gmail.com";
        knex
            .select("*")
            .from("UserInformation")
            .leftJoin("CreatePostTable AS CPT","CPT.Gmail","UserInformation.Gmail")
            .leftJoin("LikeDislikeTable AS LDT","LDT.Gmail","UserInformation.Gmail")
            .where("UserInformation.Gmail",DecodGmail)
            .then((Data)=>{
                res.end(JSON.stringify(Data))
                console.log(Data)
            }).catch((err)=>{
                console.log(err);
            })
    })

}