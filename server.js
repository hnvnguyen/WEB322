
const mealsData = require("./mealsData.js");
const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


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

app.post('/account/login', (req, res) => {
    mealsData.validateLogin(req.body).then(() => {
        let me = "Login Successfully";
        res.render('informPage', {message: me});
    }).catch((errorL) => {
        res.render('account', {err: errorL});
    });
});

app.post('/account/register', (req, res) => {
    mealsData.validateRegis(req.body).then(() => {
        let me = "Register Successfully";
        res.render('informPage', {message: me});
        // Nodemailer: piece of code is mainly taken from w3schools.com.
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dearmuggles@gmail.com', 
                pass: '(=HarryPotter0_0=)' 
            }
          });
        var mailOptions = {
            from: '"FastServe" <dearmuggles@gmail.com>',
            to: req.body.regisEmail,
            subject: 'FastServe Registration',
            text: 'Hi ' + req.body.regisFName + ',\nYour registration form has been successfully handled. Thank you for choosing our service.'
        };
        transporter.sendMail(mailOptions);
        
    }).catch((errorR) => {
        res.render('account', {err: errorR});
    });
});

app.use((req, res) => {
    let me = "Page Not Found"
    res.status(404).render('informPage', {message: me});
});

app.listen(HTTP_PORT, onHttpStart);
