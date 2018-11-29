const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

require('./config/passport')(passport);
const auth = require('./routes/auth');


const app = express();

const port = process.env.PORT || 3000;
app.use('/auth', auth);
app.get('/', (req, res) => {
    res.send('ok');
})



app.listen(port, () => {
    console.log(`Server has started on ${port}`);

})