import React from 'react'
import NavBar from './navBar'
import MyVinylView from './myVinylView'
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
					<NavBar />
					<MyVinylView />
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
			<div className="container body">
  				<div className="row">
    				<div className="col-md-9 col-sm-offset-2">
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
				</div>
			</div>
			)
		}
	})



export default Dashboard