const env = require('dotenv').config()
// console.log(process.env.PASSWORD);

//This is need for database open
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
})




// // This for create table if table not exist in databes
// knex.schema.hasTable('UserInformation').then(function(exists){
//     if (!exists){
//         return knex.schema.createTable('UserInformation', function(table){
//             table.increments("UserId").primary();
//             table.string('Name')
//             table.string('Gmail')
//             table.integer('Password')
            
//         }).then(()=>{
//             console.log("User Information Table created sucesesful ");
//         }).catch((err)=>{
//             console.log(err);
//         })
//     }else{
//         console.log('User Information Table exists in databases');
//     }
// });


//   //This is create table for create post
// knex.schema.hasTable('CreatePostTable').then(function(exists){
//     if (!exists){
//         return knex.schema.createTable('CreatePostTable', function(table){
//             table.increments("Id").primary();
//             table.integer("UserId");
//             table.string("Gmail");
//             table.date("Date");
//             table.time("Time");
//             table.string("Text");
//             table.string("Discription");   
//         }).then(()=>{
//             console.log("Create Post Table created sucesesful ");
//         }).catch((err)=>{
//             console.log(err);
//         })
//     }else{
//         console.log('Create Post Table exists in databases');
//     }
// });


// //This is create table for like & dislike
// knex.schema.hasTable('LikeDislikeTable').then(function(exists){
//     if (!exists){
//         return knex.schema.createTable('LikeDislikeTable', function(table){
//         table.increments("Id").primary();
//         table.integer("UserId");
//         table.integer("PostId");
//         table.string("Gmail");
//         table.integer("Like");
//         table.integer("Dislike");
            
//         }).then(()=>{
//             console.log("Like & Dislike table created sucesesful ");
//         }).catch((err)=>{
//             console.log(err);
//         })
//     }else{
//         console.log('Like & Dislike Table exists in databases');
//     }
// });

  

module.exports = knex;




