const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//iteration 2
Recipe.create({
  title: "tarte au citron",
  level: "UltraPro Chef",
  ingredients: ["citron", "pate à tarte"],
  cuisine: "yes",
  dishType: "Dessert",
  image:
    "https://www.google.fr/url?sa=i&source=images&cd=&ved=2ahUKEwiv7sX136XkAhUSExQKHYkPDJ8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.hervecuisine.com%2Frecette%2Ftarte-au-citron-classique%2F&psig=AOvVaw2y5RFKsd_buRTl4nCnN5zQ&ust=1567088014868850",
  duration: 180,
  creator: "Alex",
  created: ""
});
//iteration 3
Recipe.insertMany(data)
  .then(newRecipe =>
    console.log(
      newRecipe.forEach(eachRecipe =>
        console.log("Neww recipe created", eachRecipe.title)
      )
    )
  )
  .catch(err => {
    console.log("An error happened:", err);
  });

//iteration 4
Recipe.updateMany({ title: "Rigatoni alla Genovese" }, { duration: 3000 })
  .then(res => console.log("great", res))
  .catch(err => console.log("An error happened:", err));

//iteration 5
Recipe.deleteOne({ title: "Carrot Cake" })
  .then(console.log("great great"))
  .catch(err => console.log("An error happened:", err));

//iteration 6

mongoose.connection.on("disconnected", () =>
  console.log("Mongoose default connection disconnected")
);

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
