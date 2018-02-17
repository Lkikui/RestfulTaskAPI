/* ---------- modules ---------- */
//express
var express = require('express');
var app = express();

//mongoose
var mongoose = require('mongoose');

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

//Angular
app.use(express.static( __dirname + '/restfulTaskAngularApp/dist' ));

/* ---------- database ---------- */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/RestfulTaskAPI');

var TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 5},
    description: {type: String, required: true, minlength: 5},
    completed: {type: Boolean, required: true, default: false}
}, {timestamps: true});
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

/* ---------- routes ---------- */
//retrieves all tasks
app.get('/tasks', function(req, res){
    Task.find({}, function(err, tasks){
        if(err){
            console.log('ERROR: could not fetch results');
        } else {
            console.log('result fetch successful');
            res.send(tasks);
        }
    })
});

//retrieves a task by id
app.get('/tasks/:id', function(req, res){
    console.log(`fetching task id: ${req.params.id}`);
    Task.findOne({_id: req.params.id}, function(err, task){
        if(err){
            console.log('ERROR: unable to fetch task');
        } else {
            console.log(`successfully fetched task id: ${req.params.id}`);
            console.log(task);
            res.send(task);
        }
    })
});

//creates tasks
app.post('/tasks', function(req, res){
    var task = new Task({title: req.body.title, description: req.body.description, completed: req.body.completed});
    task.save(function(err){
        if(err){
            console.log('error: unable to create new task');
            res.send(err.message);
        } else {
            console.log(`sucessfully added ${req.params.title}`);
            res.redirect('/tasks');
        }
    })
});

//updates a task by id
app.put('/tasks/:id', function(req, res){
    Task.update({_id: req.params.id}, {$set: {title: req.body.title, description: req.body.description, completed: req.body.completed}}, function(err, tasks){
        if(err){
            console.log('ERROR: edit unsuccessful');
        } else {
            console.log('successfully edited!');
        }
    })
    res.redirect('/tasks');
});

//delete a task by id
app.delete('/tasks/:id', function(req,res){
    console.log('initiating removal');
    Task.remove({_id: req.params.id}, function(err, tasks){
        if(err){
            console.log('Error: unable to remove');
        } else {
            console.log('successfully removed');
        }
    })
    res.redirect('/tasks');
})

/* ---------- port ---------- */
app.listen(8000, function(){
    console.log('RestfulTaskAPI Project listening on port 8000');
})