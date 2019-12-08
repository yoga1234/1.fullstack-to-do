// load the things we need
const express = require('express')
const cookieParser = require('cookie-parser')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const PORT = 3000
const session = require('express-session')
const path = require('path')

let db // cast db variable for database

let sess // create global variable for session

// assign express method in app
let app = express()

// use express
app.use(session({
  'secret': 'secret',
  resave: false,
  saveUninitialized: false
}))

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
app.set('views', path.join(__dirname, 'views'))

// setting the body parser for form
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// use cookie parser for getting cookie
app.use(cookieParser("secret", { httpOnly: false }))

// setting up for homepage
app.get('/', (req, res) => {
  if (sess) {
    res.render('home')
  } else {
    res.redirect('login')
    console.log(sess)
  }
})

app.post('/', (req, res) => {
  sess = req.session
  db.collection('login').findOne({ "name": req.body.username })
    .then((result) => {
      if (result && result.password == req.body.password) {
        sess.username = result.username
        res.render('home')
      } else {
        res.send("Error: Data not found")
        console.log(req.body)
      }
    })
    .catch(err => console.error(err))
})

// setting up if user input form
app.get('/login', (req, res) => {
  res.render('login')
})

// setting up logout for user
app.get('/logout', (req, res) => {
  sess = undefined
  res.redirect('/')
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
