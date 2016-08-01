import Backbone from 'backbone'
import _ from 'underscore'
import {VinylModel, VinylCollection, UserCollection, TradesModel, TradesCollection} from './models/models'

const TRADE_STORE = _.extend(Backbone.Events, {
	data: {
		vinylCollection: new VinylCollection(),
		userCollection: new UserCollection(),
		vinylModel: new VinylModel(),
		tradesCollection: new TradesCollection(),
		tradesModel: new TradesModel()
		//vinylByOwner: new vinylByOwnerCollection()
	},


	// vc.fetch({
	// 	url: '/vinyl/{whateverhteidis}'
	// })

	_emitChange: function () {
		this.trigger('updateContent') //>>> broadcast to component (.on) 

	},

	_getData: function () {
		return _.clone(this.data) //>>> controls state
	},

	_initialize: function () {
		this.data.vinylCollection.on('sync update', this._emitChange.bind(this)),
		this.data.userCollection.on('sync update', this._emitChange.bind(this)),
		this.data.vinylModel.on('sync update', this._emitChange.bind(this)),
		this.data.tradesCollection.on('sync update', this._emitChange.bind(this)),
		this.data.tradesModel.on('sync update', this._emitChange.bind(this))
	},

})

TRADE_STORE._initialize()

export default TRADE_STORE