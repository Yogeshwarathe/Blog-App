module.exports = (app,jwt,knex)=>{
    app.get('/get_signupPage',function(req,res){
        res.sendFile(__dirname + "/" + "./SignUpPage.html");
        // console.log("it's get");
    })
}