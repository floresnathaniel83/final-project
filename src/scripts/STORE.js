import Backbone from 'backbone'
import _ from 'underscore'
import {VinylCollection, UserCollection} from './models/models'

const TRADE_STORE = _.extend(Backbone.Events, {
	data: {
		vinylCollection: new VinylCollection(),
		userCollection: new UserCollection()

	},

	_emitChange: function () {
		this.trigger('updateContent') //>>> broadcast to component (.on) 

	},

	_getData: function () {
		return _.clone(this.data) //>>> controls state
	},

	_initialize: function () {
		this.data.vinylCollection.on('sync update', this._emitChange.bind(this)),
		this.data.userCollection.on('sync update', this._emitChange.bind(this))
	},

})

TRADE_STORE._initialize()

export default TRADE_STORE