const express = require('express');
const mongoose = require('mongoose');

const app = express();


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('ok');
})



app.listen(port, () => {
    console.log(`Server has started on ${port}`);

})