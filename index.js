const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 5050;

const blogRoute = require('./routes/blogRoute');
const userRoute = require('./routes/userRoute')

// app.get('/', (req, res)=> {
//     console.log(req.body);
//     console.log(req.params);
//     res.send('Hello from server');
// })


// connection with database
mongoose.connect('mongodb://127.0.0.1:27017/MERN').then(() => {
    console.log("connect to db");
}).catch(err => {
    console.log(err);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/blog', blogRoute);
app.use('/user', userRoute);


app.listen(port, ()=> console.log('App listen in port '+ port));