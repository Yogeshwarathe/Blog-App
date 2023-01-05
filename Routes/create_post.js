module.exports = (app,jwt,knex,urlencodedParser,fun_coll)=>{
    app.post("/create_post",urlencodedParser,async(req,res)=>{
        const TokenCookies = await req.cookies.TokenJWT;
        const decoding = await jwt.decode("SECRETKEY");
        // console.log(decoding);
        const DecodGmailId = decoding.tokenJanretar.Gmail;
        // console.log(DecodGmailId);
        // const DecodGmailId = "good@gmail.com"
        knex
        .select("*")
        .from("UserInformation")
        .where("Gmail",DecodGmailId)
        .then((Data)=>{
            // console.log(userPost);
            const user = {UserId: Data[0].UserId,Gmail:Data[0].Gmail,Date:fun_coll.TodayDate(),Time:fun_coll.Time(),Text: req.body.Text,Discription: req.body.Discription};
            // console.log(user);
            knex("CreatePostTable")
            .insert(user)
            .then(()=>{
                res.end(JSON.stringify({Discription: req.body.Discription}))
                console.log("post create susessfull");
                // res.sendFile(__dirname + "/" + "./LikeDislikePage.html");
                })
            .catch((err)=>{
                res.end(JSON.stringify(err));
                console.log(err);
            })
                    
        }) 
    })
}