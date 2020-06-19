module.exports.meals = [
    {
        id: 0,
        name: "Vegetable Fried Rice",
        image: "img/meal0.jpg",
        price: "$12.00"
    },
    {
        id: 1,
        name: "Lentil Soup",
        image: "img/meal1.jpg",
        price: "$5.50"
    },
    {
        id: 2,
        name: "Spider Sushi Roll",
        image: "img/meal2.jpg",
        price: "$10.50"
    },
    {
        id: 3,
        name: "California Sushi Roll",
        image: "img/meal3.jpg",
        price: "$11.00"
    },
    {
        id: 4,
        name: "Chicken Shawarma",
        image: "img/meal4.jpg",
        price: "$10.50"
    },
    {
        id: 5,
        name: "Avgolemono Soup",
        image: "img/meal5.jfif",
        price: "$5.00"
    },
    {
        id: 6,
        name: "Rustic Ratatouille",
        image: "img/meal6.jfif",
        price: "$9.00"
    },
    {
        id: 7,
        name: "Paleo Moussaka",
        image: "img/meal7.jpg",
        price: "$10.00"
    }
];

module.exports.mealPackages = [
    {
        id: 0,
        name: "Vegetarian",
        desc: "A diverse mix of fruits, vegetables, grains, healthy fats and proteins (Healthline).",
        image: "img/mealPackage0.jpg",
        price: "$20.00",
        category: "Vegetarian",
        mealsItem: [0, 1],
        topPackage: true
    },
    {
        id: 1,
        name: "Sushi",
        desc: "A staple rice dish of Japanese cuisine, consisting of cooked rice, vegetable, egg, or raw seafood garnishes (Britannica).",
        image: "img/mealPackage1.jpg",
        price: "$22.50",
        category: "Sushi",
        mealsItem: [2, 3],
        topPackage: false
    },
    {
        id: 2,
        name: "Mediterranean",
        desc: "A diet traditionally followed in Greece that emphasizes fruits and vegetables, nuts, grains, olive oil, etc. (Medicinenet)",
        image: "img/mealPackage2.jpg",
        price: "$24.75",
        category: "Mediterranean",
        mealsItem: [4, 5],
        topPackage: true
    },
    {
        
        id: 3,
        name: "Gluten-free",
        desc: "A diet that involves excluding foods which contain the protein gluten, including wheat, rye and barley (Healthline).",
        image: "img/mealPackage3.jfif",
        price: "$29.90",
        category: "Gluten-free",
        mealsItem: [6, 7],
        topPackage: false
    },
    {
        
        id: 4,
        name: "Weight Loss",
        desc: "These are mainly whole foods like fish, lean meat, vegetables, fruit, nuts, seeds and legumes (Healthline).",
        image: "img/mealPackage4.jpg",
        price: "$30.00",
        category: "Weight Loss",
        mealsItem: [1, 6, 7],
        topPackage: true
    },
    {
        
        id: 5,
        name: "Soup",
        desc: "This package is served warm and made by combining ingredients of meat or vegetables with stock, or water (Wikipedia).",
        image: "img/mealPackage5.jpg",
        price: "$11.40",
        category: "Soup",
        mealsItem: [1, 5],
        topPackage: true
    }
];

module.exports.features = [
    {
        title: "Delivery",
        image: "img/homeFeature0.svg",
        desc: "Fast and reliable"
    },
    {
        title: "Time",
        image: "img/homeFeature1.svg",
        desc: "Quick preparing time"
    },,
    {
        title: "Healthy",
        image: "img/homeFeature2.svg",
        desc: "Fresh and delicious meals"
    },
    {
        title: "Security",
        image: "img/homeFeature3.svg",
        desc: "Secure payment methods"
    }
];