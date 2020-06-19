
const path = require("path");
const express = require("express");
const app = express();
const mealsData = require("./public/mealsData.js");

var HTTP_PORT = process.env.PORT || 8080;
var onHttpStart = function() {
    console.log("Express HTTP Server listening on port: " + HTTP_PORT);
};

// Set up handle bars
const exphbs = require("express-handlebars");
app.set('views', './views');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


// Public directory for accessibility
app.use(express.static("public"));


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

app.post('/account/register', (req, res) => {
    res.redirect('/');
    console.log("Register form submitted.");
});

app.post('/account/login', (req, res) => {
    res.redirect('/');
    console.log("Login form submitted.");
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(HTTP_PORT, onHttpStart);
