import React from 'react'
import Header from './header'
import {User} from '../models/models'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'

const Dashboard = React.createClass({
	getInitialState: function () {
		return TRADE_STORE._getData()

	},

	componentWillMount: function () {

		let queryForUser = {}
		
		ACTIONS.fetchUsers(queryForUser)
		/*
		let queryForVinyl 
		if(this.props.routedFrom === 'vinyl/shelf') {
	 		 queryForVinyl = {'ownerId' : this.state.userCollection.models[0].get('_id')} 
		} 

		ACTIONS.fetchVinyl(queryForVinyl)
		*/		

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
				<div className='dashboard' >
					<h3>DASHBOARD</h3>
					<Header />
					<CollectorsContainer routedFrom = 'vinyl/shelf' userColl = {this.state.userCollection} />
				</div>
			)

	}
})

const CollectorsContainer = React.createClass({
	
	render: function() {
		return (
			<div className="collectorsContainer">
				{this.props.userColl.map(
					(model) => <Collector routedFrom = 'vinyl/shelf' userModel = {model} key = {model.id} />)}
			</div>
			)
	}
})

const Collector = React.createClass({
	handleShelfToggle: function () {
		location.hash = 'vinyl/shelf'
		let queryForVinyl 
		if(this.props.routedFrom === 'vinyl/shelf') {
	 		 queryForVinyl = {'ownerId' : this.props.userModel.get('_id')} 
		} 

		ACTIONS.fetchVinyl(queryForVinyl)
	
	},
		
	render: function() {
		return (
			<div onClick = {this.handleShelfToggle} className="collector">
				<img src = {this.props.userModel.get('favImgUrl')}/>
				<p>user: {this.props.userModel.get('email')}</p>
				<p>favorite genres: {this.props.userModel.get('genreTags')}</p>
				<p>how I got addicted: {this.props.userModel.get('journeyDesc')}</p>
				<p>the one that got away: {this.props.userModel.get('vinylMissed')}</p>
				<p>best dollar bin record: {this.props.userModel.get('vinylDollar')}</p>
			</div>
			)
		}
	})

export default Dashboard