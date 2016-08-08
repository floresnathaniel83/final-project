import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import Header from './header'
import {TradesModel, TradesCollecton, User} from '../models/models'


const AllTradesView = React.createClass({
	
	getInitialState: function () {
		return TRADE_STORE._getData()

	},

	componentWillMount: function () {
		
		let queryTrades = {
			$or: JSON.stringify([{ offeringUser: User.getCurrentUser()._id },{ confirmingUser: User.getCurrentUser()._id }])
			// put together the query object
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
		return (
			<div className = 'trade'>
				<Header />
				<OutgoingTradesContainer outgoingTradesColl= {this.state.tradesCollection.where({offeringUser: User.getCurrentUser()._id})} />
				<IncomingTradesContainer incomingTradesColl= {this.state.tradesCollection.where({confirmingUser : User.getCurrentUser()._id})} />
			</div>

			)

	}

})

const OutgoingTradesContainer = React.createClass({
	render: function () {
		return (
			<div className = 'trade'>
				<h3>Outgoing Trades</h3>
				{this.props.outgoingTradesColl.map(
				(model) => <OutgoingTrades outgoingTradesModel={model} key={model.id} />)}

			</div>
			)
	}

})

const OutgoingTrades = React.createClass({
	_handleDelete: function () {
		ACTIONS.deleteTrades(this.props.outgoingTradesModel.get('_id'))

	},

	render: function () {
		console.log(this.props.outgoingTradesModel.get('_id'))
		let acceptClass = ''
		if (this.props.outgoingTradesModel.get('accepted') === 'no' || this.props.outgoingTradesModel.get('accepted') === 'pending') {
			acceptClass = 'hidden'
		} 
		let rejectClass = ''
		let deleteClass = ''
		if (this.props.outgoingTradesModel.get('accepted') === 'yes' || this.props.outgoingTradesModel.get('accepted') === 'pending') {
			rejectClass = 'hidden'
			deleteClass = 'hidden'
		}

		return (
			<div className = 'tradesContainer'>
				<div className = 'trade'>
					<h4>I'm Offering</h4>
					<img src = {this.props.outgoingTradesModel.get('vinylTrade').imageUrl} />
					<p>artist: {this.props.outgoingTradesModel.get('vinylTrade').artist}</p>
					<h4>I Want</h4>
					<img src = {this.props.outgoingTradesModel.get('vinylWant').imageUrl} />
					<p>artist: {this.props.outgoingTradesModel.get('vinylWant').artist}</p>
					<h3 className={acceptClass}>Cool!!! [Marshall] has accepted your offer and will be in contact soon via email..</h3>
					<h3 className={rejectClass}>Its a no go. Check out what else is on [Marshall's] shelf that may be of interest you!!</h3>
					<button onClick={this._handleDelete} className={deleteClass}>X</button>

				</div>
			</div>	

			)
	}
})

const IncomingTradesContainer = React.createClass({
	render: function () {
		return (
			<div className = 'trade'>
				<h3>Incoming Trades</h3>
				{this.props.incomingTradesColl.map(
				(model) => <IncomingTrades incomingTradesModel={model} key={model.id} />)}

			</div>
			)
	}

})

const IncomingTrades = React.createClass({

	_handleAccept: function () {
		ACTIONS.acceptTrades(this.props.incomingTradesModel)

	},

	_handleReject: function () {
		ACTIONS.rejectTrades(this.props.incomingTradesModel)

	},

	_handlePending: function () {
		ACTIONS.pendingTrades(this.props.incomingTradesModel)

	},

	render: function () {
		console.log(this.props.incomingTradesModel)
		let acceptClass = ''

		if (this.props.incomingTradesModel.get('accepted') === 'no' || this.props.incomingTradesModel.get('accepted') === 'pending') {
			acceptClass = 'hidden'
		} 
		let rejectClass = ''

		if (this.props.incomingTradesModel.get('accepted') === 'yes' || this.props.incomingTradesModel.get('accepted') === 'pending') {
			rejectClass = 'hidden'

		}
		/*
		let styleObj = {}
		if (this.props.incomingTradesModel.get('accepted') === 'yes') {
			styleObj = {left: "30px"}
		}
		*/

		


		return (
			<div className = 'tradesContainer'>
				<div className = 'trade'>
					<h4>User Offers</h4>
					<img src = {this.props.incomingTradesModel.get('vinylTrade').imageUrl} />
					<p>artist: {this.props.incomingTradesModel.get('vinylTrade').artist}</p>
					<h4>User Wants</h4>
					<img src = {this.props.incomingTradesModel.get('vinylWant').imageUrl} />
					<p>artist: {this.props.incomingTradesModel.get('vinylWant').artist}</p>
					<h3 className={acceptClass}>Cool!! contact [rza] at [rza@wutang.com]</h3>
					<h3 className={rejectClass}>That sucks. Check out what else is on [rza's] shelf that may interest you!!</h3>
					<button id='accept' onClick={this._handleAccept}>YES</button>
					<button id='pending' onClick={this._handlePending}>Thinking</button>
					<button id='reject' onClick={this._handleReject}>NO</button>
					

				</div>
			</div>	

			)
	}
})





export default AllTradesView 