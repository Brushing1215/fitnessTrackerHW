const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose")
const PORT = process.env.PORT || 3000;
const db = require("./models")
const app = express();
const path = require('path')
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.get("/api/workouts",(req, res)=>{
    db.Workout.find()
    .then(workouts=> res.json(workouts))
    .catch(err=>res.json(err))
})
app.get("/api/workouts/range",(req, res)=>{
    db.Workout.find().limit(7)
    .then(workouts=> res.json(workouts))
    .catch(err=>res.json(err))
})
app.post("/api/workouts",(req, res)=>{
    db.Workout.create({})
    .then(workouts=> res.json(workouts))
    .catch(err=>res.json(err))
})
app.put("/api/workouts/:id", (req, res)=>{
    const id = req.params.id
    console.log(req.body, 'test')
    db.Workout.findByIdAndUpdate(id, {$push:{exercises: req.body}},{new: true, runValidators: true})
    .then(workouts=> res.json(workouts))
    .catch(err=>res.json(err))
})

app.delete("/api/workouts/", (req, res)=>{
    db.Workout.findByIdAndDelete(req.body.id)
    .then(workouts=> res.json(workouts))
    .catch(err=>res.json(err))
})
app.get('/exercise',(req, res)=>{

    res.sendFile(path.join(__dirname, "./public/exercise.html"))
})
app.get("/stats", (req, res)=>{

    res.sendFile(path.join(__dirname, "./public/stats.html"))  
})


app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}/`)
);
