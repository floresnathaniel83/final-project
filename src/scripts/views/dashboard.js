import React from 'react'
import Header from './header'
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
					<h3>DASHBOARD</h3>
					<Header />
					<CollectorsContainer userColl = {this.state.userCollection} />
					
				</div>
			)

	}
})

const CollectorsContainer = React.createClass({
	
	render: function() {
		return (
			<div className="collectorsContainer">

				<h2>Who would you like to be record pals with?</h2>
				<h3>Click to view shelf and trade</h3>
				{this.props.userColl.map(
					(model) => <Collector userModel = {model} key = {model.id} />)}
			</div>
			)
	}
})

const Collector = React.createClass({

	render: function() {
		return (
			<a href = {`#vinyl/shelf/${this.props.userModel.get('_id')}`} className="collector">
				<img src = {this.props.userModel.get('favImgUrl')}/>
				<p>user: {this.props.userModel.get('email')}</p>
				<p>favorite genres: {this.props.userModel.get('genreTags')}</p>
				<p>how I got addicted: {this.props.userModel.get('journeyDesc')}</p>
				<p>the one that got away: {this.props.userModel.get('vinylMissed')}</p>
				<p>best dollar bin record: {this.props.userModel.get('vinylDollar')}</p>
			</a>
			)
		}
	})



export default Dashboard