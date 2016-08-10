import React from 'react'
import NavBar from './navBar'
import ACTIONS from '../ACTIONS'
import TRADE_STORE from '../STORE'
import {UserModel, User} from '../models/models'
import ReactFilepicker from 'react-filepicker'

const ComposeView = React.createClass({
	getInitialState: function () {
		return TRADE_STORE._getData()
		
	},

	componentWillMount: function () {

		let queryForSingleUser = User.getCurrentUser()._id 
		
		ACTIONS.fetchSingleUser(queryForSingleUser)
		
		TRADE_STORE.on('updateContent', () => {
	 			this.setState(TRADE_STORE._getData())
			})
	},
	
	componentWillUnmount: function () {
		TRADE_STORE.off('updateContent')

	},

	render: function() {
	 	console.log(this.state.userModel)
	 	return (
	 		<div className="composeView" >
	 			<NavBar />
	 			<h3>FILL YOUR SHELF UP!</h3>
	 			<VinylPostingForm usersInfoModel={this.state.userModel}/>
	 		</div>
	 	)
 	}
})

const VinylPostingForm = React.createClass({

	_handleCompose: function (e) {
			e.preventDefault()
			ACTIONS.saveVinyl({
				ownerId: User.getCurrentUser()._id,
				artist: e.currentTarget.artist.value,
				title: e.currentTarget.title.value,
				year: e.currentTarget.year.value,
				location: e.currentTarget.location.value,
				artistDesc: e.currentTarget.artistDesc.value,
				imageUrl: this.url ? this.url :'/images/image-not-found-med-2.jpg',
				usersInfo: User.getCurrentUser()
			})

		},
		
		_handleImage: function (result) {
			//console.log(result) 
			this.url = result.url 


		},

		render: function() {
			return (
				
				<div className="vinylPostingForm">
					<form onSubmit = {this._handleCompose}>
						<input type = 'text' name = 'title' placeholder = 'Enter the name of the album' />
						<input type = 'text' name = 'artist' placeholder = 'Enter the artist' />
						<input type = 'text' name = 'year' placeholder = 'Enter the year produced' />
						<textarea type = 'text' name = 'artistDesc' placeholder = 'Enter description'></textarea>
						<input type = 'text' name = 'location' placeholder = 'What record store did you find it at?'/>
						<ReactFilepicker apikey= 'A0hkVciLxQAuC7SR2RhKDz' onSuccess={this._handleImage}/>
	
						<button type = 'submit'>Submit</button>
					</form>
				</div>
				)
		}

})

export default ComposeView