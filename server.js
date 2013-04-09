var express = require('express'),
    path = require('path'),
	todos = require('./routes/todos');
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/tasks', todos.findAll);
app.get('/tasks/:id', todos.findById);
app.post('/tasks', todos.addTask);
app.put('/tasks/:id', todos.updateTask);
app.delete('/tasks/:id', todos.deleteTask);

app.listen(3000);
console.log('Express server listening on port 3000');

// http.createServer(app).listen(app.get(3000), function () {
//     console.log("Express server listening on port 3000");
// });