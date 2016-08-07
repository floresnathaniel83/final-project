import React from 'react'
import Header from './header'
import {User, UserModel, UserCollection} from '../models/models'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
//components are like the corporate managers receiving all the information or files or data and sometimes they will speak back to 

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
		console.log(this.state)
		return (
				<div className='dashboard' >
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
				<h5>Name:</h5> 
				<p>{this.props.userModel.get('name')}</p>
				<h5>Favorite genres:</h5>
				<p> {this.props.userModel.get('genreTags')}</p>
				<h5>How I got into collecting records:</h5>
				<p> {this.props.userModel.get('journeyDesc')}</p>
				<h5>The one that got away:</h5>
				<p> {this.props.userModel.get('vinylMissed')}</p>
				<h5>Best dollar bin record:</h5>
				<p> {this.props.userModel.get('vinylDollar')}</p>
			</a>
			)
		}
	})



export default Dashboard