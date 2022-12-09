const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors');
const mysql = require("mysql2")
const bodyParser = require('body-parser')

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Neha@123"
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
//by default to select a database socialapp
con.query("use socialapp", function (err, result) {
  if (err) throw err;
  console.log("Database selected");
});

//login API to get valid user login details
app.post('/login', (req, res) => {
  console.log("********/login***********")
  const { email, password } = req?.body
  con.query(`select * from user where email='${email}' and password = '${password}'`, (err, result) => {
    if (err) throw err;
    if (result) {
      console.log("result", result);
      // res.header("Access-Control-Allow-Origin", "*");
      res.send({ result });
    }
  })
});


app.post('/registerUser', (req, res) => {

  const { email, password, firstName, address, city, role, mobileNumber, lastName } = req?.body
  con.query(`insert into user (email, password,firstName,address, city, role, mobileNumber, lastName) values('${email}', '${password}', '${firstName}', '${address}', '${city}', '${role}', '${mobileNumber}', '${lastName}')`, (err, result) => {
    if (err) console.log(err)
    if (result) {
      console.log("********/registerUser***********", result)
      res.send({
        result
      })
    }
  })
})

app.get('/getComaplints', (req, res) => {

  // const { email, password, firstName, address, city, role, mobileNumber, lastName } = req?.body
  con.query(`select * from complaints`, (err, result) => {
    if (err) console.log(err)
    if (result) {
      console.log("********/getComaplints***********", result)
      res.send({
        result
      })
    }
  })
})

app.get("/getAdminType")

app.post('/complaintDetails', (req, res) => {

  const { image, lat, lon, complaintType, description, city, district, postalCode, state } = req?.body
  con.query(`insert into complaints (image, lat, lon, complaintType, description, city, district, postalCode, state) values('${image}', '${lat}', '${lon}', '${complaintType}', '${description}', '${city}', '${district}', '${postalCode}', '${state}')`, (err, result) => {
    if (err) {
      console.log(err)
      res.send({
        err
      })
    }
    if (result) {
      console.log("********/complaintDetails***********", result)
      res.send({
        result: { 
          ...result, 
          complaintId: result.insertId
        }
      })
    }
  })

})

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
