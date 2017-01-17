import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import NavBar from './navBar'
import MyVinylView from './myVinylView'
import Footer from './footer'
import {User, VinylModel, VinylCollection, TradesModel} from '../models/models'
import $ from 'jquery'

const DetailView = React.createClass({
	getInitialState: function () {
		return TRADE_STORE._getData()

	},

	componentWillMount: function () {
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
		return (
				 <div className = 'detail-vinyl-view'>
					<NavBar />
					<MyVinylView />
					<Detail vinylModel = {this.state.vinylModel} />
					<Footer />
				</div>
			

			)
		}
	})

	const Detail = React.createClass({

		render : function () {
			return (
						<div className = 'vinyl-container'>
							<h3>Interested? Let's Trade</h3>
							<div className = 'vinyl'>
								<ul>
									<li><img src = {this.props.vinylModel.get('imageUrl')}/></li>
									<li>artist: {this.props.vinylModel.get('artist')}</li>
									<li>Year: {this.props.vinylModel.get('year')}</li>
									<li>Record Store Bought At: {this.props.vinylModel.get('location')}</li>
									<li>Artist Description: {this.props.vinylModel.get('artistDesc')}</li>
								</ul>
							</div> 
							<a href={`#vinyl/offer/${this.props.vinylModel.get('_id')}`} id='trade-button'>Trade</a>
						</div>

				)



		}




	})

export default DetailView