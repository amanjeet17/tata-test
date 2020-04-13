const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// ObjectID = require('mongodb').ObjectID
var id = mongoose.Types.ObjectId();
// Post model
const Meal = require('../../models/Meals');

// Profile model
const User = require('../../models/User');

// Validation
const validateMealInput = require('../../validation/meals');

// @route   GET api/meals/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Meals Works' }));


// @route   GET api/meals/user_meal_info
// @desc    Get posts
// @access  Private to Admin only
router.get('/user_meal_info/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.findById(req.user.id)
        .then(user => {
            if (user.role === 'admin') {
                Meal.find({"user":req.params.id})
                    .sort({ mealDate: -1 })
                    .then(meals => res.json(meals))
                    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
            }
            else {
                res.status(404).json({ permisionIssue: "Sorry!, you don't have admin rights" })
            }
        })
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
});

// @route   GET api/meals/mydashboard
// @desc    Get post by id
// @access  Private to users logged in
router.get('/mydashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    Meal.find({ 'user': req.user.id })
        .sort({ mealDate: -1 })
        .then(meals => {
            res.json(meals)
        })
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
});


// @route   POST api/meals/addmeal
// @desc    Create post
// @access  Private
router.post(
    '/addmeal',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateMealInput(req.body);
        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }

        Meal.find({
            "_id":req.body.dayId
        })
            .then((data) => {
                const { name, calorie } = req.body
                const newMealEntry = {
                    _id: new mongoose.mongo.ObjectId(),
                    "name": name,
                    "calorie": calorie
                }
                if (data.length == 0) {
                    const addMeal = {
                        _id: new mongoose.mongo.ObjectId(),
                        user: req.body.userId ==undefined ? req.user.id:req.body.userId ,
                        meals: [newMealEntry]
                    }
                    const newMeal = new Meal(addMeal);

                    newMeal.save().then(meal => res.status(200).json(addMeal));
                }
                else {
                    let meals = data[0].meals;
                    let newMeal = {
                        "_id": new mongoose.mongo.ObjectId(),
                        "name": name,
                        "calorie": calorie
                    }
                    meals.push(newMeal)
                    Meal.updateOne(
                        { "_id": data[0]['id'] },
                        { $set: { meals: meals } })
                        .then((newdata) => {
                            res.status(200).json(newMeal)
                        })
                        .catch((err) => res.status(400))
                }
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    }
);



// @route   POST api/meals/addmeal
// @desc    Create post
// @access  Private
router.post(
    '/editmeal',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateMealInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }  
        const { dayId, _id, name, calorie } = req.body;
        Meal.findById(dayId)
            .then((data) => {
                let meals = data.meals
                let updatedMeals = meals.map((meal) => {
                    if (meal._id == _id) {
                        meal.name = name
                        meal.calorie = calorie
                    }
                    return meal
                })
                Meal.updateOne({ "_id": dayId },
                    {
                        $set: { meals: updatedMeals }
                    })
                    .then((data) => {
                        res.status(200).json({ "success": true })
                    })
                    .catch((err) => console.log("err uypdate", err))
            })
    }
);

// @route   DELETE api/meals/deletemeal
// @desc    Create post
// @access  Private
router.delete(
    '/deletemeal/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Meal.findOneAndUpdate({"meals._id": req.params.id}, 
                    {$pull:{"meals":{_id:req.params.id}}},
                    {returnNewDocument: true})
        .then((data) => {
            if(data.meals.length==1){
                Meal.findByIdAndDelete(data._id)
                    .then((newData) => {
                        res.status(200).json([])
                    })
                    .catch((err) => res.status(400).json(err));
            }
            else{

                res.status(200).json(data.meals)
            }
        })
        .catch((err) => res.status(400).json(err));
    }
);



module.exports = router;
