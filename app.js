const express = require('express');
const path = require('path');
const app = express();
const ejsmate = require('ejs-mate');
const io = require("socket.io");
const methodOverride = require("method-override");
const userRoutes = require("./routes/userRoutes");
const session = require('express-session');
const passport = require('passport');
const LocalStratergy = require('passport-local');
const User = require('./models/userModel');


app.set('view engine', 'ejs');
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'views/styles')));

const mon = require('./config/db.js');
mon();
const classes = require('./models/class.js');

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use((session(sessionConfig)));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.get('/', (req, res) => {
    // res.render("pages/home");
    res.render("pages/classes");
});



app.use('/user', userRoutes);


app.get('/:classid', (req, res) => {
    const classid = req.params.classid;
    const thisClass = classes.find({ _id: classid });
    res.render("pages/class", { thisClass });
});

app.post('/newclass', async (req, res) => {
    console.log(req.body);
    const newclass = await new classes({ subject: req.body.subject, standard: req.body.standard });
    await newclass.save();

    res.redirect(`${newclass._id}`);
});

app.listen(3000, () => {
    console.log("lisitening to port 3000");
});