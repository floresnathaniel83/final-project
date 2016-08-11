import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import NavBar from './navBar'
import {User, VinylModel, VinylCollection} from '../models/models'
import $ from 'jquery'

const ShelfView = React.createClass({
	getInitialState: function () {
		return TRADE_STORE._getData()

	},
	
	componentWillMount: function () {
		
		let queryForVinyl = {ownerId : this.props.ownerId}

		ACTIONS.fetchVinyl(queryForVinyl)
		
		TRADE_STORE.on('updateContent', () => {
	 			this.setState(TRADE_STORE._getData())
			})

	},

	componentWillUnmount: function () {
		TRADE_STORE.off('updateContent')

	},

	render: function () {
		console.log( )
		return (
				<div className = 'shelf'>
					<NavBar />
					<CollectorsVinylContainer vinylColl = {this.state.vinylCollection} />
					
				</div>
			)
		}
	})

const CollectorsVinylContainer = React.createClass ({
	render : function () {
		console.log(this.props.vinylColl.models[0].get('usersInfo').name) //>>> ***having trouble accessing userInfo***
		return (
				<div className = 'vinylContainer'>
					<h3>{this.props.vinylColl.models[0].get('usersInfo').name}'s Collection</h3>
									{this.props.vinylColl.map(
					(model) => <CollectorsVinyl vinylModel = {model} key = {model.id} />)}

				</div>
			)
	}


})

const CollectorsVinyl = React.createClass ({
	render: function () {
		console.log(this.props.vinylModel)
		return (
			<div className="container body">
  				<div className="row">
    				<div className="col-md-9 col-sm-offset-2">
						<a href={`#vinyl/detail/${this.props.vinylModel.get('_id')}`} className='vinyl'>
							<ul>
								<li><img src = {this.props.vinylModel.get('imageUrl')}/></li>
								<li>Artist: {this.props.vinylModel.get('artist')}</li>
								<li>title: {this.props.vinylModel.get('title')}</li>

							</ul>
						</a>
					</div>
				</div>
			</div>		
			)
	}


})


export default ShelfView