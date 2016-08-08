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
					<MyVinylContainer vinylColl = {this.state.vinylCollection} /> 

				</div>
			)
		}
	})

const MyVinylContainer = React.createClass ({
	getInitialState: function () {
		return {
	      isShowing: false,
	      buttonTxt: "X"
    	}


	},

	_toggleMenu: function(){
	    if(this.state.isShowing){
	      this.setState({ isShowing: false  })
	    } else {
	        this.setState({ isShowing: true  })
	    }
	},	

	render : function () {
		 if ( this.state.isShowing ){
		     var styleObj = {transform: "translateX(150%)"}
		     var buttonTxt = "X"
	    } else {
		     var styleObj = {transform: "translateX(252%)"}
		     var buttonTxt = "<"
    }

		return (
				<div style={styleObj} className = 'myVinylContainer'>{/*side panel*/}
					<h3>My Shelf</h3>
					{this.props.vinylColl.map(
					(model) => <MyVinyl vinylModel = {model} key = {model.id} />)}
					<button onClick={this._toggleMenu}>{buttonTxt}</button>
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
				<div className = 'vinyl'>
					
					<ul>
						<li><img src = {this.props.vinylModel.get('imageUrl')} /></li>
						<li>Artist: {this.props.vinylModel.get('artist')}</li>
						<li>Title: {this.props.vinylModel.get('title')}</li>
						<li>Year: {this.props.vinylModel.get('year')}</li>
						<li>Record Store: {this.props.vinylModel.get('location')}</li>
						<li>Artist Description: {this.props.vinylModel.get('artistDesc')}</li>

					</ul>
				</div>
				
			</div>

			)
		}
	})



export default MyVinylView