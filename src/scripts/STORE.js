import Backbone from 'backbone'
import _ from 'underscore'
import {VinylModel, VinylCollection, UserCollection, TradesModel, TradesCollection} from './models/models'

const TRADE_STORE = _.extend(Backbone.Events, {
	data: {
		vinylCollection: new VinylCollection(),
		userCollection: new UserCollection(),
		vinylModel: new VinylModel(),
		tradesCollection: new TradesCollection(),
		vinylOffered: new VinylModel()		
		//vinylByOwner: new vinylByOwnerCollection()
	},

	_set: function(key,val) { //>>> sets any changes to data
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
		this.data.userCollection.on('sync update', this._emitChange.bind(this)),
		this.data.vinylModel.on('sync update', this._emitChange.bind(this)),
		this.data.tradesCollection.on('sync update', this._emitChange.bind(this))
	}

})

TRADE_STORE._initialize()

export default TRADE_STORE