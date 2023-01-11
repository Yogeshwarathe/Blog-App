module.exports = (app,jwt,knex,urlencodedParser,function_call)=>{
    app.post("/signup",urlencodedParser,async(req,res)=>{
        // console.log(req.body);
        if(req.body.Name != undefined && req.body.Gmail != undefined && req.body.Password != undefined){
            knex
                .select("*")
                .from('UserInformations')
                .where("Gmail",req.body.Gmail)
                .then((RowsData) => {
                    if(RowsData[0] != undefined){
                        if(RowsData[0].Password == req.body.Password){
                            function_call.login_page_function(res);
                            console.log("All ready have a account");
                        }
                    }else{
                        knex('UserInformations')
                            .insert(req.body)
                            .then(()=>{
                                console.log("Sign Up sucsesfull")
                                function_call.login_page_function(res);
                                })
                            .catch((err) => { 
                                console.log(err); 
                            })
                    }
            })
        }
    })
}
    
