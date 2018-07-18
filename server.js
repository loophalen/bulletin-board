const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res)=>{
    res.send('hello world')
});




// Connect to the DB
mongoose.connect('mongodb://localhost:27017/bulletin_board_app', {useNewUrlParser: true});
mongoose.connection.once('open', ()=>{
    console.log('Connected to mongoose...');
})

// Start The server
app.listen(3000, ()=> {
    console.log('listening....')
})
