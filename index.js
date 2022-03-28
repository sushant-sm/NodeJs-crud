const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/users'

const app = express();
mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection;
app.use(express.json());

con.on('open', () => {
    console.log('connectedd');
})

const userRoutes = require('./routes/usersRoute');
app.use('/users', userRoutes);

app.listen(9000, () =>{
    console.log("listening on 9000");
})