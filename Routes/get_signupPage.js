module.exports = (app,jwt,knex,function_call)=>{
    app.get('/get_signupPage',function(req,res){
        function_call.sign_up_page_function(res);
        console.log("Sign Up Page Got");
    })
}