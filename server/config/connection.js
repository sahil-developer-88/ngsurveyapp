var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'survey_db'
});



// con.connect(function(err) {
//         if (err)            
//         {                      
//             throw err;
//         }
//         else
//         {
//             console.log("Connected!");
//         }    
// });
exports.module=con;