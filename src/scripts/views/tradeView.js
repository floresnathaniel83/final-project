import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import Header from './header'
import MyVinylView from './MyVinylView'
import {User, VinylModel, VinylCollection, TradesModel, TradesCollecton} from '../models/models'
import $ from 'jquery'

const TradeView = React.createClass ({
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
		return (
			<div className = 'trade'>
				
				<MyVinylView />
				<TradeContainer vinylModel = {this.state.vinylModel} />
				
			</div>


			)

	}
})

const TradeContainer = React.createClass ({
	render: function () {
		return (
			<div className = 'trade'>
				<h3>TRADE</h3>
				<p>I want</p>
				<img src = {this.props.vinylModel.get('imageUrl')}/>
				<p>artist: {this.props.vinylModel.get('artist')}</p>
			</div>


			)

	}

})

export default TradeView