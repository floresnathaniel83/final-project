import React from 'react'
import Header from './header'
import ACTIONS from '../ACTIONS'
import {User} from '../models/models'
//import ReactFilepicker from 'react-filepicker'

const ComposeView = React.createClass({
	 render: function() {
	 	return (
	 		<div className="composeView" >
	 			<Header />
	 			<h3>LETS FILL YOUR SHELF UP!</h3>
	 			<VinylPostingForm />
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
				artistDesc: e.currentTarget.artistDesc.value
			
				
				//imageUrl: this.url ? this.url: '/images/empty-plate.jpg',
				
			})

		},
		/*
		_handleImage: function (result) {
			//console.log(result) test make sure it works
			this.url = result.url //


		},

		//>>> use for album covers <ReactFilepicker apikey= 'A0hkVciLxQAuC7SR2RhKDz' onSuccess={this._handleImage}/>
		*/

		render: function() {
			return (
				
				<div className="vinylPostingForm">
					<form onSubmit = {this._handleCompose}> 
						<input type = 'text' name = 'title' placeholder = 'Enter the vinyl title' />
						<input type = 'text' name = 'artist' placeholder = 'Enter the artist' />
						<input type = 'text' name = 'year' placeholder = 'Enter the year produced' />
						<textarea type = 'text' name = 'artistDesc' placeholder = 'Enter description'></textarea>
						<input type = 'text' name = 'location' placeholder = 'where did you find it?'/>
						<button type = 'submit'>Submit</button>
					</form>
				</div>
				)
		}

})

export default ComposeView