//user middleware
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token : String,
  admin: Boolean,
  meta: {
    website: String
  },
  created_on: Date,
  updated_on: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_on = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_on)
    this.created_on = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);


var users = {

  getAll: function(req, res) {
    var allusers = data; // Spoof a DB call
    res.json(allusers);
  },

  getOne: function(req, res) {
    var id = req.params.id;
    var user = data[0]; // Spoof a DB call
    res.json(user);
  },

  create: function(req, res) {
	// create a new user
	var newUser = User({
	  "name": req.body.name,
	  "email": req.body.email,
	  "password": req.body.password,
	  "admin": req.body.admin
	});

	// save the user
	newUser.save(function(err) {
	  if (err) throw err;
	
	  res.json(newUser);
	});	
  },

  update: function(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    data[id] = updateuser // Spoof a DB call
    res.json(updateuser);
  },

  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};

var data = [{
  name: 'user 1',
  id: '1'
}, {
  name: 'user 2',
  id: '2'
}, {
  name: 'user 3',
  id: '3'
}];

module.exports = users;
