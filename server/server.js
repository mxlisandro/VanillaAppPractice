const express = require("express");
const app = express();
const PORT = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
// const sessionController = require('./controllers/sessionController');
const toDoController = require('./controllers/todoControoler')

const MONGO_URI =
  "mongodb+srv://test:codesmith@vanillaapp.jzyjvfv.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "VanillaApp",
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use('/client', express.static(path.resolve(__dirname, '../client')));

app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, (req, res) => {
  // what should happen here on successful log in?
  console.log("before redirecting to index")
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
});

app.get('/signup',  (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});

app.get('/getToDo',toDoController.getList, (req,res)=>{
  return res.status(200).send(res.locals.toDoData)
})

app.post('/addTodo', toDoController.saveNew, (req,res)=>{
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
})

app.patch('/updateTodo', toDoController.updateToDo , (req,res)=>{
  return res.status(200).send("updated")
})

app.delete('/deleteTodo',toDoController.deleteToDo , (req,res)=>{
  return res.status(200).send("deleted")
})

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/login.html'));
});

app.post('/signup', userController.createUser , cookieController.setSSIDCookie, (req, res) => {
  // what should happen here on successful sign up?
  //sends file to client sendFile is a biult in method
  res.redirect('/');
});


app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occured'}
    };
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
  });
  
  
  /**
   * start server
   */
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  module.exports = app;