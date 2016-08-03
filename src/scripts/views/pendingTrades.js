import React from 'react'
import ReactDOM from 'react-dom'
import TRADE_STORE from '../STORE'
import ACTIONS from '../ACTIONS'
import Header from './header'
import {TradesModel, TradesCollecton} from '../models/models'


const PendingTrades = React.createClass({
	getInitialState: function () {
		return TRADE_STORE._getData()

	},

	componentWillMount: function () {
		let queryForTrade
		queryForTrade = {offeringUser :  }
		
		ACTIONS.fetchTrade(queryForTrade)
		
		TRADE_STORE.on('updateContent', () => {
	 			this.setState(TRADE_STORE._getData())
			})

	},




})

export default PendingTrades