const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
//>>> all schemas have their own id given by mongoose unique to the db
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  favImgUrl: {type: String, default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=retro&f=y'},
  genreTags: {type: [String], required: true }, //>>>can be used to search tags
  journeyDesc: {type: String, required: true},
  vinylMissed: {type: String, required: true},
  vinylDollar: {type: String, required: true}	
  
 })

const vinylSchema = new Schema ({ 
	ownerId: {type: String, required: true},
	artist: {type: String, required: true},
	title: {type: String, required: true},
	year: {type: Number, required: true},
	imageUrl: {type: String, required: true},
	location: {type: String},
	artistDesc: {type: String, required: true}
},

{
	timestamps: true

})

const tradesSchema = new Schema ({
	offeringUser: {type: String, required: true}, //>>> getCurrentUser
	confirmingUser: {type: String, required: true}, //>>> ownerId 
	vinylWant: vinylSchema, //>>> vinylId
	vinylTrade: vinylSchema, //>>> vinylId 
	accepted: {type: Boolean, default: false}

})

module.exports = {
  User: createModel('User', usersSchema),
  Vinyl: createModel('Vinyl', vinylSchema),
  Trade: createModel('Trade', tradesSchema)

}