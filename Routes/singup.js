module.exports = (app, jwt,knex,urlencodedParser)=>{
    app.post("/SignUp",urlencodedParser,(req,res)=>{
        // console.log(req.body);
        if(req.body.Name != undefined && req.body.Gmail != undefined && req.body.Password != undefined){
            // console.log("null")
        
            knex.select("*").from('UserInformation').then((RowsData) => {
                var available = 0;
                for(row of RowsData){
                    if(row.Gmail == req.body.Gmail && req.body.Name == row.Name){
                        available = 1
                    }
                }

                if(available == 0){
                    // console.log('it databases;')                       
                    knex('UserInformation').insert(req.body).then(()=>{
                        console.log("Sign Up sucsesfull")
                        // res.end(JSON.stringify("Sign Up Succsesful"));
                        res.sendFile(__dirname + "/" + "./LoginPage.html");
                        })
                        .catch((err) => { 
                            console.log(err); 
                        })
                }else{
                    res.end(JSON.stringify("All ready signup, go to login "));
                }
            })
        }
    })
}
    
