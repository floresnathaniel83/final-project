import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import NavBar from './navBar'
import MyVinylView from './myVinylView'
import Footer from './footer'
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
				<NavBar />
				<MyVinylView />
				<OutgoingTradesContainer outgoingTradesColl= {this.state.tradesCollection.where({offeringUser: User.getCurrentUser()._id})} />
				<IncomingTradesContainer incomingTradesColl= {this.state.tradesCollection.where({confirmingUser : User.getCurrentUser()._id})} />
				<Footer />
			</div>

			)

	}

})

const IncomingTradesContainer = React.createClass({
	render: function () {
		console.log(this.props.incomingTradesColl)
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
		let acceptClass = ''

		if (this.props.incomingTradesModel.get('accepted') === 'no' || this.props.incomingTradesModel.get('accepted') === 'pending') {
			acceptClass = 'hidden'
		} 
		let rejectClass = ''

		if (this.props.incomingTradesModel.get('accepted') === 'yes' || this.props.incomingTradesModel.get('accepted') === 'pending') {
			rejectClass = 'hidden'

		}

		return (
			<div className = 'vinyl-container'>
				<div className = 'vinyl'>
					<h3>{this.props.incomingTradesModel.get('vinylTrade').usersInfo.name} Offers</h3>
						<ul>
							<li><img src = {this.props.incomingTradesModel.get('vinylTrade').imageUrl} /></li>
							<li>artist: {this.props.incomingTradesModel.get('vinylTrade').artist}</li>
						</ul>

					<h3>{this.props.incomingTradesModel.get('vinylTrade').usersInfo.name} Wants</h3>
						<ul>
							<li><img src = {this.props.incomingTradesModel.get('vinylWant').imageUrl} /></li>
							<li>artist: {this.props.incomingTradesModel.get('vinylWant').artist}</li>
						</ul>

					<h3 className={acceptClass}>Cool! Contact {this.props.incomingTradesModel.get('vinylTrade').usersInfo.name} at {this.props.incomingTradesModel.get('vinylTrade').usersInfo.email}</h3>
					<h3 className={rejectClass}>Check out what else is on {this.props.incomingTradesModel.get('vinylTrade').usersInfo.name}'s  shelf that may be of interest to you!</h3>
					<button className='confirm' onClick={this._handleAccept}>YES</button>
					<button  className='confirm' onClick={this._handleReject}>NO</button>
					
				</div>
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
		ACTIONS.deleteTrades(this.props.outgoingTradesModel)

	},

	render: function () {
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
			<div className = 'vinyl-container'>
				<div className = 'vinyl'>
					<h3>I'm Offering</h3>
						<ul>
							<li><img src = {this.props.outgoingTradesModel.get('vinylTrade').imageUrl} /></li>
							<li>artist: {this.props.outgoingTradesModel.get('vinylTrade').artist}</li>

						</ul>
					<h3>I Want</h3>
						<ul>
							<li><img src = {this.props.outgoingTradesModel.get('vinylWant').imageUrl} /></li>
							<li>artist: {this.props.outgoingTradesModel.get('vinylWant').artist}</li>

						</ul>
					<h3 className={acceptClass}>Cool! {this.props.outgoingTradesModel.get('vinylWant').usersInfo.name} has accepted your offer and will be in contact soon. check your email..</h3>
					<h3 className={rejectClass}>Its a no go. Check out what else is on {this.props.outgoingTradesModel.get('vinylWant').usersInfo.name}'s shelf that may be of interest you!!</h3>
					<button id = 'delete' onClick={this._handleDelete} className={deleteClass}>X</button>

				</div>
			</div>	

			)
	}
})

export default AllTradesView 