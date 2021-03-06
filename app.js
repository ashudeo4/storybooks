const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require("path");
require('./config/passport')(passport);
var methodOverride = require('method-override')
const auth = require('./routes/auth');
const index = require('./routes/index');
const keys = require('./config/keys');
require('./models/user');
require('./models/story');

const stories = require('./routes/stories');

mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Mongodb connected")
    })
    .catch(err => {
        console.log(err);

    });
const app = express();
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(session({
    secret: 'serc',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

const port = process.env.PORT || 3000;
app.use('/auth', auth);
app.use('/', index);
app.use('/stories', stories);



app.listen(port, () => {
    console.log(`Server has started on ${port}`);

})