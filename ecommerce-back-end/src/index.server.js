require('dotenv').config();
const express = require('express');
const app = express();
const PORT =process.env.PORT;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// router
const userRoutes = require('./routes/user')

//mongodbb connection
// mongodb+srv://root:<password>@cluster0.1xung.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.1xung.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            userCreateIndex: true
        }
    ).then(() =>{
        console.log("Databse Connected")
    });




app.use(bodyParser());//used as a medium to pass data to server
app.use('/api',userRoutes);// when making a request if we manuplate the date then it is middleware 

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`); 
});