module.exports = (app, jwt,knex,urlencodedParser,function_call)=>{
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
                        function_call.login_page_function(res);
                        })
                        .catch((err) => { 
                            console.log(err); 
                        })
                }else{
                    function_call.login_page_function(res);
                    console.log("All ready have a account");
                }
            })
        }
    })
}
    
