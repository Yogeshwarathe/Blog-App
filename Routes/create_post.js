module.exports = (app,jwt,knex,urlencodedParser)=>{
    app.post("/create_post",urlencodedParser,(req,res)=>{
        // console.log(req.body.Post);
        async function decodeToken(){
            var TokenCookies = await req.cookies.TokenJWT;
            // console.log(TokenCookies);
            SECRET_KEY1 = String(process.env.SECRET_KEY)
            const decoding = await jwt.decode(TokenCookies,SECRET_KEY1);
            // console.log(decoding);
            const DecodGmailId = decoding.tokenJanretar.Gmail;
            // console.log(DecodGmailId);

            knex.select("*").from("UserInformation").then((RawData)=>{
                for(row of RawData){
                    if(row.Gmail == DecodGmailId){
                        // console.log(row.Id);
                        var NewDate = new Date().toISOString().slice(0, 10);
                        const date = Date()
                        const new_date = new Date(date)
                        const hours = new_date.getHours()
                        const minutes = new_date.getMinutes()
                        const userPost = {UserId: row.UserId,Gmail:row.Gmail,Date:NewDate,Time:hours+":"+minutes,Text: req.body.Text,Discription: req.body.Discription};
                        // console.log(userPost);

                        knex("CreatePostTable").insert(userPost).then(()=>{
                            // res.end(JSON.stringify("post insert sucsesfull"))
                            console.log("post create susessfull");
                            res.sendFile(__dirname + "/" + "./LikeDislikePage.html");
                        }).catch((err)=>{
                            res.end(JSON.stringify(err));
                        })
                    }
                }
            })
        }
        decodeToken()   
    })
}