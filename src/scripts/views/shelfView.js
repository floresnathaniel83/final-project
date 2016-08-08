import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import Header from './header'
import {User, VinylModel, VinylCollection} from '../models/models'

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
					<Header />
					<CollectorsVinylContainer vinylColl = {this.state.vinylCollection} />
					
				</div>
			)
		}
	})

const CollectorsVinylContainer = React.createClass ({
	render : function () {
		//console.log(this.props.vinylColl.models[0].attributes) //>>> ***having trouble accessing userInfo***
		return (
				<div className = 'vinylContainer'>
									{this.props.vinylColl.map(
					(model) => <CollectorsVinyl vinylModel = {model} key = {model.id} />)}

				</div>
			)
	}


})

const CollectorsVinyl = React.createClass ({
	render: function () {
		return (
			<div className = 'vinylContainer'>
				<a href={`#vinyl/detail/${this.props.vinylModel.get('_id')}`} className='vinyl'>
					<img src = {this.props.vinylModel.get('imageUrl')}/>
					<p>title: {this.props.vinylModel.get('title')}</p>
				</a>
				
			</div>
			)
	}


})


export default ShelfView