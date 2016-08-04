import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import Header from './header'
import TreasureVinyl from './treasureVinyl'
import {TradesModel, TradesCollecton, User} from '../models/models'


const AllTradesView = React.createClass({
	
	getInitialState: function () {
		return TRADE_STORE._getData()

	},

	componentWillMount: function () {
		
		let queryTrades = {
			offeringUser: User.getCurrentUser()._id,
			confirmingUser: User.getCurrentUser()._id
		}
		
		ACTIONS.fetchTrades(queryTrades)
		
		TRADE_STORE.on('updateContent', () => {
	 			this.setState(TRADE_STORE._getData())
			})
	},

	componentWillUnmount: function () {
		TRADE_STORE.off('updateContent')
	
	},
	
	render: function () {
		console.log(this.state.tradesCollection)
		return (
			<div className = 'trade'>
				<Header />
				<AllTradesContainer tradesColl = {this.state.tradesCollection} />
			</div>

			)

	}

})

const AllTradesContainer = React.createClass({
	render: function () {
		console.log(this.props)
		return (
			<div className = 'trade'>
				{this.props.tradesColl.map(
				(model) => <OutgoingTrades outgoingTradesModel = {model} key = {model.id} />)}

			</div>
			)

	}

})

const OutgoingTrades = React.createClass({
	render: function () {
		return (
				<TreasureVinyl vinylModel = {this.props.outgoingTradesModel} />
			)

	}


})

export default AllTradesView 