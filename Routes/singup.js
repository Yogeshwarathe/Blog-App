module.exports = (app, jwt,knex,urlencodedParser)=>{
    app.post("/signup",urlencodedParser,(req,res)=>{
        // console.log(req.body);
        if(req.body.Name != undefined && req.body.Gmail != undefined && req.body.Password != undefined){
            knex.select("*").from('UserInformation').then((RowsData) => {
                var exists = 0;
                for(row of RowsData){
                    if(row.Gmail == req.body.Gmail && req.body.Name == row.Name){
                        exists = 1
                    }
                }
                if(exists == 0){
                    knex('UserInformation').insert(req.body).then(()=>{
                        console.log("Sign Up sucsesfull")
                        res.end(JSON.stringify("Sign Up Succsesful"));
                        // res.sendFile(__dirname + "/" + "./LoginPage.html");
                        })
                        .catch((err) => { 
                            console.log(err); 
                        })
                }else{
                    // res.sendFile(__dirname + "/" + "./LoginPage.html");
                    res.end(JSON.stringify("All ready hava a account"))
                    console.log("All ready have a account");
                }
            })
        }
    })
}
    
