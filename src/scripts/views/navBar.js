import React from 'react'
import ACTIONS from '../actions'
import {User} from '../models/models'

const NavBar = React.createClass({
	render: function() {

		return (

			<header id="landing-page-header">
				<h1 className='logo'>π</h1>
 				<h1>vinyl pi</h1>
 				<div id="nav-bar">
					<a  href="#login">Log In</a>
					<a  href="#home">All Vinyl</a>
	        		<a  href="#vinyl/postVinyl">Post Vinyl</a>
	        		<a  href="#trades/allTrades">All Trades</a>
	        		<a  href="#login" onClick={ACTIONS.logUserOut} >Log Out</a>
        		
				</div>

 			</header>
			
			

			)
	}
})

export default NavBar