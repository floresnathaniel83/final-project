import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import Header from './header'
import MyVinylView from './myVinylView'
import {User, VinylModel, VinylCollection} from '../models/models'
import $ from 'jquery'

const OfferView = React.createClass ({
	getInitialState: function () {
		return TRADE_STORE._getData() //physically sets new shit on state

	},

	componentWillMount: function () {
		let queryForSingleVinyl =  {vinylId: this.props.vinylId}
		
		ACTIONS.fetchSingleVinyl(queryForSingleVinyl) //actions is like modify or filter this new shit that came in
		
		TRADE_STORE.on('updateContent', () => {
	 			this.setState(TRADE_STORE._getData())
			})

	},

	componentWillUnmount: function () {
		TRADE_STORE.off('updateContent')

	},

	render: function () {
		console.log(this.state)
		return (
			<div className = 'trade'>
				<Header />
				<MyVinylView />
				<TradeContainer 
					offeredVinylModel={this.state.vinylOffered} //>>> new shit set on state
					wantedVinylModel={this.state.vinylModel} 
					/>
			</div>
			)
	}
})

const TradeContainer = React.createClass ({
		
	_handleTrade: function (e) {
		e.preventDefault()
		ACTIONS.saveTrades({
			offeringUser: User.getCurrentUser()._id, //>>> getCurrentUser
			confirmingUser: this.props.wantedVinylModel.get('ownerId'), //>>> ownerId 
			vinylWant: this.props.wantedVinylModel.attributes, //>>> full vinyl schema
			vinylTrade: this.props.offeredVinylModel.attributes //>>> full vinyl schema

		})
	},

	render: function () {
		let buttonClass = ''
		if (!this.props.offeredVinylModel.get('artist')) {
			buttonClass = 'hidden'
		}

		return (
			<div className = 'trade'>
				<h3>TRADE</h3>
				<div className = 'vinyl'>
					<h1>I want</h1>
					<img src = {this.props.wantedVinylModel.get('imageUrl')} />
					<p>artist: {this.props.wantedVinylModel.get('artist')}</p>
				</div>
				<div className = 'vinyl'>
					<h1>I offer</h1>
					<img src = {this.props.offeredVinylModel.get('imageUrl')} />
					<p>artist:{this.props.offeredVinylModel.get('artist')}</p>
				</div>
				<button onClick ={this._handleTrade} className={buttonClass}>make offer</button>
	
			</div>
			)

	}

})

export default OfferView