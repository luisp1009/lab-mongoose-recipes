const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then (() =>{
    return Recipe.create(
      {
        "title": "Ceviche",
        "level": "Amateur",
        "ingredients": [
          "fish",
          "lime juice",
          "onions",
          "corn",
          "salt and pepper",
          "rocoto pepper",
          "ginger",
          "garlic"
        ],
        "cuisine": "Peruvian",
        "dishType": "main dish",
        "image": "https://www.feastingathome.com/wp-content/uploads/2015/04/Ceviche-11.jpg",
        "duration": 20,
        "creator": "Luis Paredes"
      }
    )
  })
  .then(() => {
    return Recipe.insertMany(data)
  } )

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Chocolate Chip Cookies" },
      { duration: 30 }
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Asian Glazed Chicken Thighs" });
  })
  .then(() => {
    return mongoose.connection.close();
  })

  
  .catch((err))

 
