var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost/sample_express');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Mongodb Connected Successfully");
});

var UserSchema = new mongoose.Schema({
    name : String,
    email: String,
    age: Number
}),
	Users = mongoose.model('sample_express', UserSchema, 'Users');

/* GET USER LIST */
router.get('/', function(req, res) {
	//console.log(Users.find().pretty());
	Users.find({}, function(err, users){
		res.render('users', {users : users});
	});
});

/* NEW USER */
router.get('/new', function(req, res) {
	res.render('newuser');
});

/* PARAM CALL*/
router.param('name', function(req, res, next, name){
	Users.find({ name : name }, function(err, docs){
		req.user = docs[0];
		next();
	});
});

/* SHOW USER */
router.get('/:name', function(req, res){
	console.log(req.user);
	res.render('showuser', { user : req.user });
});


/* EDIT USER */
router.get('/:name/edit', function(req, res){
	res.render('edituser', { user : req.user });
});


/* CREATE USER */
router.post('/', function(req, res){
	var b = req.body;
	new Users({
		name : b.name,
		email : b.email,
		age: b.age		
	}).save(function(err, user){
		if(err) res.json(err);

		res.redirect('/users/' + user.name);
	});
});


/* UPDATE USER */
router.put('/:name', function(req, res){
	console.log("I am in update");
	var b = req.body;	
	Users.update(
		{ name : req.params.name},
		{ name : b.name, email : b.email, age : b.age},
		function(err) {
			res.redirect('/users/' + b.name)
		}
	);
});

/* DELETE USER */
router.delete('/:name', function(req, res) {
	Users.remove(
		{ name : req.params.name},
		function(err){
			res.redirect('/users/');
		}
	);
});

module.exports = router;
