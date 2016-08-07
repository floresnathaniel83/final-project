import Backbone from 'backbone'
import _ from 'underscore'
import {VinylModel, VinylCollection, UserCollection, UserModel, TradesModel, TradesCollection} from './models/models'
//Controls the state of the app (data is just chilling here )
//The Store is like a room full of file cabinets
const TRADE_STORE = _.extend(Backbone.Events, {
	data: {
		vinylCollection: new VinylCollection(),
		vinylModel: new VinylModel(), //>>> can be set as new shit anywhere
		vinylOffered: new VinylModel(), //>>> may need to use intrade: yes/no >>> hidden/not hidden
		userCollection: new UserCollection(),
		userModel: new UserModel(),
		tradesCollection: new TradesCollection(),
		tradesModel: new TradesModel()		
		//vinylByOwner: new vinylByOwnerCollection()
	},

	_set: function(key,val) { //>>> sets any changes to data(the new shit) on state
		console.log('KEY:', key, 'VALUE:', val)
		if (this.data[key] === undefined) {
			throw Error(`${key} property not on the STORE, make sure to declare`)

		}
		this.data[key] = val
		this._emitChange()
	},

	_emitChange: function () {
		this.trigger('updateContent') 

	},

	_getData: function () {
		return _.clone(this.data) 
	},

	_initialize: function () {
		this.data.vinylCollection.on('sync update', this._emitChange.bind(this)),
		this.data.vinylModel.on('sync update', this._emitChange.bind(this)),
		this.data.userCollection.on('sync update', this._emitChange.bind(this)),
		this.data.userModel.on('sync update', this._emitChange.bind(this)),
		this.data.tradesCollection.on('sync update', this._emitChange.bind(this))
	}

})

TRADE_STORE._initialize()

export default TRADE_STORE