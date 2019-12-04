// load the things we need
const express = require('express')
const cookieParser = require('cookie-parser')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const PORT = 3000

let db // cast db variable for database

// assign express method in app
let app = express()

// make a static folder with express
app.use(express.static('public'))

let connectionString = 'mongodb://localhost:27017/TodoApp'

// connecting to the database
mongodb.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  // check for error
  if (err) {
    throw err
    console.log(err)
  } else {
    console.log('Successfully connected to the database')

    // use all db() method
    db = client.db()

    // server listening on port 3000
    // app will listen to port after connection to mongodb success
    app.listen(PORT)
    console.log("Server is listening on port 3000")
  }
})

// set the view engine to ejs
app.set('view engine', 'ejs')

// setting the body parser for form
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// use cookie parser for getting cookie
app.use(cookieParser("secret", { httpOnly: false }))

// setting up for homepage
app.get('/', (req, res) => {
  res.render('home')
})

// setting up if user input form
app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
  db.collection('login').findOne({ "name": req.body.username })
    .then((result) => {
      if (result && result.password == req.body.password) {
        // console.log(req.body)
        // res.cookie('nameTodo', result.name, { httpOnly: false })
        // res.render('home', { name: result.name })
        res.send("Success")
      } else {
        res.send("Error")
        console.log(req.body)
      }
    })
    .catch(err => console.error(err))
})

// setting up logout for user
app.get('/logout', (req, res) => {
  res.clearCookie('nameTodo')
  res.redirect('/login')
})

// setting up for register page
app.get('/register', (req, res) => {
  res.render('register')
})

// setting up for user registration
app.post('/register', (req, res) => {
  db.collection('login').insertOne({ "name": req.body.username, "password": req.body.password })
    .then((result) => {
      console.log(`successfully inserted item with id ${result.insertedId}`)
      res.send("Success")
    })
    //.then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}, ${result.ops}`))
    .catch(err => console.error(`Failed to insert item: ${err}`))
  // then and catch returning one result

})
