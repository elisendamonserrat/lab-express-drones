// Iteration #1
const mongoose = require("mongoose");

const Drone = require("../models/drone");

const DB_NAME = "express-drones-dev";

const drones = [
    { name: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
    { name: 'Racer 57', propellers: 4, maxSpeed: 20 },
    { name: 'Courier 3000i', propellers: 6, maxSpeed: 18 }
];

mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB 🚀');
  })
  .then(() =>
    Drone.create(drones)
  )
  .then((dronesFromBD) => {
    console.log(`Created ${dronesFromBD.length} drones`)
  })
  .catch(error => {
    console.log('error ', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });




