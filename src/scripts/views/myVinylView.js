import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import {User, VinylModel, VinylCollection} from '../models/models'
import $ from 'jquery'

const MyVinylView = React.createClass({
	getInitialState: function () {
		return TRADE_STORE._getData()
		

	},
	
	componentWillMount: function () {
		let queryForVinyl
		queryForVinyl = {ownerId : User.getCurrentUser()._id}
		
		ACTIONS.fetchVinyl(queryForVinyl)
		
		TRADE_STORE.on('updateContent', () => {
	 			this.setState(TRADE_STORE._getData())
			})

	},

	componentWillUnmount: function () {
		TRADE_STORE.off('updateContent')

	},

	render: function () {
		return (
				<div className = 'myVinylView'>
					<h3>My Vinyl</h3>
					<MyVinylContainer vinylColl = {this.state.vinylCollection} /> 
				</div>
			)
		}
	})

const MyVinylContainer = React.createClass ({
	render : function () {
		return (
				<div className = 'vinylContainer'>
					{this.props.vinylColl.map(
					(model) => <MyVinyl vinylModel = {model} key = {model.id} />)}

				</div>

			)

	}


})

const MyVinyl = React.createClass ({

	handleTradeToggle: function (e) {
		e.preventDefault()
		ACTIONS.selectVinylToOffer(this.props.vinylModel)
	
	},	

	render: function () { 
		return (

			<div onClick={this.handleTradeToggle} className = 'vinyl'>
				<img src = {this.props.vinylModel.get('imageUrl')} />
				<p>Artist: {this.props.vinylModel.get('artist')}</p>
				<p>Title: {this.props.vinylModel.get('title')}</p>
				<p>Year: {this.props.vinylModel.get('year')}</p>
				<p>Record Store: {this.props.vinylModel.get('location')}</p>
				<p>Artist Description: {this.props.vinylModel.get('artistDesc')}</p>

			</div>

			)
		}
	})



export default MyVinylView