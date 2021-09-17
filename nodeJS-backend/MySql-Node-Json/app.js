var express = require('express');
var app = express();
var mysql = require("mysql");
var PORT=3000;
// app.use(express.urlencoded({ extended: false }));

var conn = mysql.createConnection({
  host: "10.10.110.2",
  user: "iotadmin",
  password: "12345678",
  database:"espdemo"
});

conn.connect();

app.get('/', (req,res) => { 
     
conn.query("select * from users", function(err,results){
    if(err){
        console.log(err);
        return;
    }
res.json(results);
    // console.log(JSON.stringify( results));
});})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
  }); 
  