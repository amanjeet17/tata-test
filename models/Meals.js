const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MealSchema = new Schema({
    // dayId:{
    //     type:Schema.Types.ObjectId,
    //     default:
    // }
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    mealDate:{
        type: Date,
        default: new Date().toISOString()
    },
    meals: [
        {
            
            name: {
                type: String,
                required: true
            },
            calorie: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = Post = mongoose.model('meal', MealSchema);
