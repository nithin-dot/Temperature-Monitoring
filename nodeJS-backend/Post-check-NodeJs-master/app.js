const csv = require('csv-parser');
const fs = require('fs');
var express = require('express');
var app = express();
var PORT = 3000;
var mysql = require('mysql');
const router = express.Router();



var pool  = mysql.createPool({
  connectionLimit:10,
  host: "10.10.110.2",
  user: "iotadmin",
  password: "12345678",
  database:"espdemo"
});


var conn = mysql.createConnection({
  host: "10.10.110.2",
  user: "iotadmin",
  password: "12345678",
  database:"espdemo",
  dateStrings:true,
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', "*");

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

conn.connect();

router.get('/get', (req,res) => {     
  conn.query("select * from users", function(err,results){
      if(err){
          console.log(err);
          return;
      }
  res.json(results);   
  });})
  
router.post('/post', function (req, res) {
fs.createReadStream('MC STUDENTS Details.csv')
.pipe(csv())
.on('data', (row) => {
  if(row['uid']===req.body.station)
  {
pool.getConnection(function(err,connection) {
  if (err) throw err;
  var sql = "INSERT INTO  users (ROLL, NAME,Temperature) VALUES ('"+row["ID"]+"', '"+row["NAME"]+"','"+req.body.status+"')";
connection.query(sql, function (err, result) {
  if (err) throw err;
  connection.release()
  res.send(row.ID)
});
});
  }
})
});

app.use("/", router);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
}); 




