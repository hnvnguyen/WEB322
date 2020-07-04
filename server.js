
const mealsData = require("./public/mealsData.js");
const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

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


// Requested routes
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
        res.redirect('/');
    }).catch((errorL) => {
        res.render('account', {err: errorL});
    });
});

app.post('/account/register', (req, res) => {
    mealsData.validateRegis(req.body).then(() => {
        res.redirect('/');
    }).catch((errorR) => {
        res.render('account', {err: errorR});
    });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(HTTP_PORT, onHttpStart);
