import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import Header from './header'
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
		return (
				<div className = 'vinylContainer'>
					<h3>Collector's Shelf</h3>
					{this.props.vinylColl.map(
					(model) => <CollectorsVinyl vinylModel = {model} key = {model.id} />)}

				</div>
			)

	}


})

const CollectorsVinyl = React.createClass ({
	render: function () {
		return (

			<a href={`#vinyl/detail/${this.props.vinylModel.get('_id')}`} className='vinyl'>
				<p>artist: {this.props.vinylModel.get('artist')}</p>
				<p>title: {this.props.vinylModel.get('title')}</p>

			</a>

			)


	}


})


export default ShelfView