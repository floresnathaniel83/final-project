import React from 'react'
import NavBar from './navBar'
import MyVinylView from './myVinylView'
import {User, UserModel, UserCollection} from '../models/models'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'

const Dashboard = React.createClass({
	
	getInitialState: function () {
		return TRADE_STORE._getData()

	},

	componentWillMount: function () {

		let queryForUser = {}
		
		ACTIONS.fetchUsers(queryForUser)

		TRADE_STORE.on('updateContent', () => {
	 			this.setState(TRADE_STORE._getData())
			})

	},

	componentWillUnmount: function () {
		TRADE_STORE.off('updateContent')

	},

	render: function () {
		return (
				<div className='dashboard' >
					<NavBar />
					<MyVinylView />
					<CollectorsContainer userColl = {this.state.userCollection} />
					
				</div>
			)

	}
})

const CollectorsContainer = React.createClass({
	
	render: function() {
		console.log()

		return (
			<div className="collectors-container">
				<h3>Welcome {User.getCurrentUser().name}!</h3>
				<h3>Click to view shelf and trade</h3>
				{this.props.userColl.map(
					(model) => <Collector userModel = {model} key = {model.id} />)}
			</div>
			)
	}
})

const Collector = React.createClass({
	
	render: function() {
		let currentUserClass = ''
		if(User.getCurrentUser('_id') === this.props.userModel.get('_id')) {
			currentUserClass = 'hidden'
	
		} 
		
		return (
				<div className={currentUserClass}>
					<a href = {`#vinyl/shelf/${this.props.userModel.get('_id')}`} className="collector">
						<ul>
							<li><img src = {this.props.userModel.get('favImgUrl')}/></li>
							<li>Name: {this.props.userModel.get('name')}</li> 
							<li>Favorite genres: {this.props.userModel.get('genreTags')}</li>
							<li>How I got into collecting records: {this.props.userModel.get('journeyDesc')}</li>
							<li>The one that got away: {this.props.userModel.get('vinylMissed')}</li>
							<li>Best dollar bin record: {this.props.userModel.get('vinylDollar')}</li>
						</ul>
					</a>
			</div>
	
			)
		}
	})



export default Dashboard