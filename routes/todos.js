var mongodb = require('mongodb');

var BSON = mongodb.BSONPure;

var db = new mongodb.Db('nodejitsudb7071645159', new mongodb.Server('linus.mongohq.com', 10022, {}));

db.open(function (err, db) {
    if (err) { throw err; }
    db.authenticate('nodejitsu', 'b9c1855daf5aa2b33ef69440c0b7cb91', function (err, replies) {
        console.log("Connected to 'todosdb' database");
        db.collection('tasks', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'tasks' collection doesn't exist...");
            }
        });
    });
});

exports.findAll = function(req, res) {
    db.collection('tasks', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving task: ' + id);
    db.collection('tasks', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.addTask = function(req, res) {
    var task = { name: req.body.name, status: 'in progress' };
    console.log('Adding task: ' + JSON.stringify(task));
    db.collection('tasks', function(err, collection) {
        collection.insert(task, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateTask = function(req, res) {
    var id = req.params.id;
    console.log('Updating task: ' + id);
    console.log(JSON.stringify(req.body));
    db.collection('tasks', function(err, collection) {
        // collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
        //     itemName = eval(item.name;
        // });
        collection.update({'_id':new BSON.ObjectID(id)}, {name: req.body.name, status: req.body.status}, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating task: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(req.body);
            }
        });
    });
};

exports.deleteTask = function(req, res) {
    var id = req.params.id;
    console.log('Deleting task: ' + id);
    db.collection('tasks', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};