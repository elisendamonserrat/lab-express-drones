const express = require('express');

// require the Drone model here
const Drone = require('./../models/drone');

const router = express.Router();

router.get('/drones', (req, res) => {
  Drone.find()
    .then(drones => {
      res.render('drones/list', { drones });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/drones/create', (req, res) => {
  res.render("drones/create-form")
  
});

router.post('/drones/create', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;

  Drone.create({name, propellers, maxSpeed})
    .then(newDrone => console.log(`New drone created: ${newDrone.name}`))
    .then(() => {
      res.redirect("/drones");
    })
    .catch(error => next(error))
});

router.get('/drones/:id/edit', (req, res, next) => {
    const { id } = req.params;

    Drone.findById(id)
      .then(drone => {
        res.render("drones/update-form", { drone })
      })
      .catch(error => next(error))
});

router.post('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;

  Drone.findOneAndUpdate(id, { name, propellers, maxSpeed }, { new: true})
   .then(() => res.redirect(`/drones`))
   .catch(error => next(error));
});

router.post('/drones/:id/delete', (req, res, next) => {
  const { id } = req.params;

  Drone.findByIdAndDelete(id)
   .then(() => res.redirect(`/drones`))
   .catch(error => next(error));
});

module.exports = router;
