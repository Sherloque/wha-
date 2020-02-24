var mongoose = require('mongoose');

var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
//var sha256File = require('sha256-file');
//const fetch = require('node-fetch');
const expressJwt = require('express-jwt');


mongoose.connect('mongodb://localhost/diplom', { useNewUrlParser: true });
var ObjectID = require('mongodb').ObjectID;


var db = mongoose.connection;

var studentSchema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  phonenumber: String,
  ticket: String,
  year: Number,
  password: String,
  status: String

});

var Student = mongoose.model('Student', studentSchema)


var recruiterSChema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  phonenumber: String,
  firm: String,
  password: String,
  status: String
});

var Recruiter = mongoose.model('Recruiter', recruiterSChema)


var adminSchema = new mongoose.Schema({
  email: String,
  password: String
});

var Admin = mongoose.model('Admin', adminSchema)


var vacancySchema = new mongoose.Schema({
  vacancyName: String,
  description: String,
  firmScope: String,
  firmLogo: String,
  firmName: String,
  address: String,
  contactNumber: Number,
  email: String,
  website: String,
  status: String
})

var Vacancy = mongoose.model('Vacancy', vacancySchema)


const config = {
  secret: `,bnb'cc`
}

function jwtWare() {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      '/login',
      '/',
      '/signup',
      '/signuprecruiter',
      '/loginadmin',
      '/signupadmin'
    ]
  });
}

function errorHandler(err, req, res, next) {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') { //отлавливает ошибку, высланную из expressJwt
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}


var app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(jwtWare());



// global error handler
app.get('/', (req, res, next) => {
  res.json({ all: 'ok' })
});
app.use(errorHandler);


db.on('error', console.error.bind(console, 'connection error:'));

app.post('/signup', async (req, res) => {
  student = await Student.findOne({ email: req.body.email })
  if (student) {
    res.status(400).json({
      err: 'Mail already exists'
    })
  }
  else {
    let newStudent = new Student(req.body)
    await newStudent.save()
    let { password, phonenumber, ticket, ...studentInfo } = newStudent.toObject()
    const token = jwt.sign({ sub: studentInfo }, config.secret)
    res.status(201).json({ token, studentInfo })
  }
})


app.post('/signuprecruiter', async (req, res) => {
  recruiter = await Recruiter.findOne({ email: req.body.email })
  if (recruiter) {
    res.status(400).json({
      err: 'Mail already exists'
    })
  }
  else {
    let newRecruiter = new Recruiter(req.body)
    await newRecruiter.save()
    let { password, phonenumber, ...recruiterInfo } = newRecruiter.toObject()
    const token = jwt.sign({ sub: recruiterInfo }, config.secret)
    res.status(201).json({ token, recruiterInfo })
  }
})

app.post('/login', async (req, res) => {
  //console.log(req)
  student = await Student.findOne({ email: req.body.login, password: req.body.password })
  recruiter = await Recruiter.findOne({ email: req.body.login, password: req.body.password })
  console.log(recruiter)
  if (student) {
    let { password, phonenumber, ticket, ...userInfo } = student.toObject()
    const token = jwt.sign({ sub: userInfo }, config.secret)
    res.status(200).json({ token, userInfo })
    console.log(userInfo, token)
  }
  else if (recruiter){
    let { password, phonenumber, ...userInfo } = recruiter.toObject()
    userInfo.role = "recruiter"
    const token = jwt.sign({ sub: userInfo }, config.secret)
    res.status(200).json({ token, userInfo })
    console.log(userInfo, token)
  }
  else {
    res.status(404).json({
      err: "Incorrect login or password"
    })
  }
})


app.post('/loginadmin', async (req, res) => {
  admin = await Admin.findOne({ login: req.body.email, password: req.body.password })
  //recruiter = await Recruiter.findOne({ login: req.body.email, password: req.body.password })
  if (admin) {
    let { password, ...adminInfo } = admin.toObject()
    const token = jwt.sign({ sub: adminInfo }, config.secret)
    res.status(200).json({ token, adminInfo })
    console.log(adminInfo, token)
  }
  else {
    res.status(404).json({
      err: "Incorrect login or password"
    })
  }
})

app.post('/signupadmin', async (req, res) => {
  admin = await Admin.findOne({ email: req.body.email })
  if (admin) {
    res.status(400).json({
      err: 'Mail already exists'
    })
  }
  else {
    let newAdmin = new Admin(req.body)
    await newAdmin.save()
    let { password, ...adminInfo } = newAdmin.toObject()
    const token = jwt.sign({ sub: adminInfo }, config.secret)
    res.status(201).json({ token, adminInfo })
  }
})


app.get('/fetchpendingstudents', async (req, res) => {
  let pendingstuds = await Student.find({ status: "pending" })
  let pendingrecrs = await Recruiter.find({status: "pending"})
  if (pendingstuds && pendingrecrs){
    //console.log(pendingstuds)
    pendings = {pendingstuds,pendingrecrs}
    console.log(pendings)
    res.send(pendings)
  }
  else {
    res.status(404).json({
      err: 'NO PENDING STUDENTS'
    })
  }
})

app.post("/verifystudent", async (req, res) => {
  let stud = await Student.findOneAndUpdate(
    { email: req.body.email },
    { $set: { status: "verified" } }
  )
  if (stud)
    res.status(200).json();
  else {
    res.status(404).json({
      err: 'NO such  STUDENT in pending'
    })
  }
})



app.delete('/deletestudent/:id', async (req, res) => {
  console.log(req)
    await Student.findOneAndDelete(
      {_id: ObjectID(req.params.id) }
    )
    res.status(200).json();
})

app.post("/verifyrecruiter", async (req, res) => {
  let recr = await Recruiter.findOneAndUpdate(
    { email: req.body.email },
    { $set: { status: "verified" } }
  )
  if (recr)
    res.status(200).json();
  else {
    res.status(404).json({
      err: 'NO such  RECRUITER in pending'
    })
  }
})


app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
