const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day:{
        type: Date,
        default: ()=> new Date()
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true, 
                required: "must enter exercise type"
            },
            name: {
                type: String,
                trim: true,
                required: "what excersise are you doing"
            },
            duration:{
                type: Number,
                required: "how long was the workout"
            },
            weight: {
                type: Number,
            },
            reps:{
                type: Number,
            },
            sets:{
                type: Number,
            },
            distance: {
                type: Number,
            }
        }
    ]
},
{
    toJSON: {
      virtuals: true
    }
  }
);
WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((summed, exercise) => {
      return summed + exercise.duration;
    }, 0);
  });
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
