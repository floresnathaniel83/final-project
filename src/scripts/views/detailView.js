import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import Header from './header'
import {User, VinylModel, VinylCollection, TradesModel} from '../models/models'
import $ from 'jquery'

const DetailView = React.createClass({
	getInitialState: function () {
		return TRADE_STORE._getData()

	},

	componentWillMount: function () {
		//console.log('collection on state:', this.state.vinylModel)
		//console.log(this.props.vinylId)
		let queryForSingleVinyl =  {vinylId: this.props.vinylId}
		
		ACTIONS.fetchSingleVinyl(queryForSingleVinyl)
		
		TRADE_STORE.on('updateContent', () => {
	 			this.setState(TRADE_STORE._getData())
			})

	},

	componentWillUnmount: function () {
		TRADE_STORE.off('updateContent')

	},

	render: function () {
		//console.log('rendering detail view', this.state.vinylModel)
		return (
				<div className = 'detail'> 
					<Header />
					<Detail vinylModel = {this.state.vinylModel} />

				</div>

			)
		}
	})

	const Detail = React.createClass({

		render : function () {
			return (
					<div className = 'detailContainer'>
						<img src = {this.props.vinylModel.get('imageUrl')}/>
						<p>artist: {this.props.vinylModel.get('artist')}</p>
						<p>Year: {this.props.vinylModel.get('year')}</p>
						<p>Record Store: {this.props.vinylModel.get('location')}</p>
						<p>Artist Description: {this.props.vinylModel.get('artistDesc')}</p>
						<a href={`#vinyl/offer/${this.props.vinylModel.get('_id')}`} className="button button-primary">Trade</a>


					</div> 


				)



		}




	})

export default DetailView