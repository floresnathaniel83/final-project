import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import NavBar from './navBar'
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
				<NavBar />
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
			<div className = 'vinyl-container'>
				<h3>TRADE</h3>
					
					<div className = 'vinyl'>
						<h1>I want</h1>
							<ul>
								<li><img src={this.props.wantedVinylModel.get('imageUrl')} /></li>
								<li>artist: {this.props.wantedVinylModel.get('artist')}</li>
								<li>Title: {this.props.wantedVinylModel.get('title')}</li>
								<li>Year: {this.props.wantedVinylModel.get('year')}</li>
								<li>Record Store: {this.props.wantedVinylModel.get('location')}</li>
								<li>Artist Description: {this.props.wantedVinylModel.get('artistDesc')}</li>
							</ul>
					</div>
				
				<div className = 'vinyl'>
					<h1>I offer</h1>
						<ul>
								<li><img src={this.props.offeredVinylModel.get('imageUrl')} /></li>
								<li>artist: {this.props.offeredVinylModel.get('artist')}</li>
								<li>Title: {this.props.offeredVinylModel.get('title')}</li>
								<li>Year: {this.props.offeredVinylModel.get('year')}</li>
								<li>Record Store: {this.props.offeredVinylModel.get('location')}</li>
								<li>Artist Description: {this.props.offeredVinylModel.get('artistDesc')}</li>
						</ul>
				</div>
				<button onClick ={this._handleTrade} className={buttonClass}>make offer</button>
	
			</div>
			)

	}

})

export default OfferView