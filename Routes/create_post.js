module.exports = (app,jwt,knex,urlencodedParser,function_call,new_date)=>{
    app.post("/create_post",urlencodedParser,async(req,res)=>{
        const TokenCookies = await req.cookies.TokenJWT;
        const decoding = await jwt.decode("SECRETKEY");
        // console.log(decoding);
        const DecodGmailId = decoding.tokenJanretar.Gmail;
        // console.log(DecodGmailId);
        // const DecodGmailId = "good@gmail.com"
        knex
        .select("*")
        .from("UserInformations")
        .where("Gmail",DecodGmailId)
        .then((Data)=>{
            if(req.body.Text == undefined && req.body.Discription == undefined){
                console.log("Text got undefined");
                function_call.create_post_function(res);
            }else{
                const user = {
                                UserId: Data[0].UserId,
                                Gmail:Data[0].Gmail,
                                Date:function_call.TodayDate(new_date),
                                Time:function_call.Time(new_date),
                                Text: req.body.Text,
                                Discription: req.body.Discription
                            };
                // console.log(user);
                knex("CreatePostTables")
                .insert(user)
                .then(()=>{
                    // res.end(JSON.stringify({Discription: req.body.Discription}))
                    console.log("post create susessfull");
                    function_call.like_dislike_page_function(res);
                    })
                .catch((err)=>{
                    res.end(JSON.stringify(err));
                    console.log(err);
                })
            }        
        }) 
    })
}