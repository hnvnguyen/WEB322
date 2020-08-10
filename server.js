
const mealsData = require("./mealsData.js");
const db = require("./db.js");
const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config()   ; // credentials
const nodemailer = require("nodemailer"); // mailing
const clientSessions = require("client-sessions"); // cookies


var HTTP_PORT = process.env.PORT || 8080;
var onHttpStart = function() {
    console.log("Express HTTP Server listening on port: " + HTTP_PORT);
};

// Public directory for accessibility
app.use(express.static(path.join(__dirname, 'public')));

// Set up handle bars
app.set('views', './views');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Body-parser: parse application/x-www-form-urlencoded && application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Dotenv
if (dotenv.error) {
    console.log(dotenv.error);
}

// Client-sessions
app.use(clientSessions({
    cookieName: "session", // object name that's gonna be added into the 'req'
    secret: process.env.SESSION_SECRET, // encrypting key
    duration: 2 * 60 * 1000, // duration of the session in milliseconds
    activeDuration: 60 * 1000 // extended duration of each request
}));
function ensureLogin(req, res, next) { // Ensure that the user session is still active
    if (!req.session.user) {
        res.redirect('/account');
    } else {
        next();
    }
}
function ensureEntryClerk(req, res, next) {// Ensure that the user is the entry clerk
    if (!req.session.user || req.session.user.user) {
        res.redirect('/account');
    } else {
        next();
    }
}


/********* Requested routes *********/

app.get('/', (req, res) => {
    res.render('home', {
        feature: mealsData.features,
        meal: mealsData.meals,
        mealPackage: mealsData.mealPackages
    });
});

app.get('/meals', (req, res) => {
    res.render('meals', {
        mealPackage: mealsData.mealPackages
    });
});

app.get('/account', (req, res) => {
    res.render('account');
});

app.get('/userDashboard', ensureLogin, (req, res) => {
    res.render('userDashboard', {user: req.session.user});
});

app.get('/clerkDashboard', ensureEntryClerk, (req, res) => {
    res.render('clerkDashboard', {user: req.session.user});
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.post('/account/login', (req, res) => {
    mealsData.validateLogin(req.body)
    .then((user) => {
        db.checkUser(user).then((userData) => {
            req.session.user = userData;
            req.session.user.user = userData.user;
            if (req.session.user.user == true) {
                res.redirect('/userDashboard');
            } else {
                res.redirect('/clerkDashboard');
            }
        }).catch((error) => {
            res.render('account', {err: error, data: req.body});
        });
    }).catch((errorL) => {
        res.render('account', {err: errorL, data: req.body});
    });
});

app.post('/account/register', (req, res) => {
    mealsData.validateRegis(req.body)
    .then(() => {
        db.addUser(req.body).then((userData) => {
            req.session.user = userData;
            req.session.user.user = userData.user; // New register accounts are all user.
            res.redirect('/userDashboard');
            // Nodemailer: this piece of code is mainly taken from w3schools.com.
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME, 
                    pass: process.env.EMAIL_PASSWORD 
                }
            });
            var mailOptions = {
                from: '"FastServe" <dearmuggles@gmail.com>',
                to: req.body.regisEmail,
                subject: 'FastServe Registration',
                text: 'Hi ' + req.body.regisFName + ',\nYour registration form has been successfully handled. Thank you for choosing our service.'
            };
            transporter.sendMail(mailOptions);
        }).catch((error) => {
            res.render('account', {err: error, data: req.body});
        });
    }).catch((errorR) => {
        res.render('account', {err: errorR, data: req.body});
    });

});

app.use((req, res) => {
    let me = "Page Not Found"
    res.status(404).render('informPage', {message: me});
});


// Mongoose database connection
db.db_init().then(() => {
    console.log("Database Successfully Connected");
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
    console.log(err);
});
