import React from 'react'
import ReactDOM from 'react-dom' 
import {vinylModel} from '../models/models'

const SingleVinyl = React.createClass ({
	render: function () {
		console.log(this.props)
		return (
			<div  className = 'vinyl'>
				<img src = {this.props.vinylModel.get('imageUrl')} />
				<p>Artist: {this.props.vinylModel.get('artist')}</p>
				<p>Title: {this.props.vinylModel.get('title')}</p>
				<p>Year: {this.props.vinylModel.get('year')}</p>
				<p>Record Store: {this.props.vinylModel.get('location')}</p>
				<p>Artist Description: {this.props.vinylModel.get('artistDesc')}</p>

			</div>
		)
	}

})

export default SingleVinyl