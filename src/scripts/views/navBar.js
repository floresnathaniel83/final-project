import React from 'react'
import ACTIONS from '../actions'
import {User} from '../models/models'



const NavBar = React.createClass({
	render: function() {

		return (
			<div id="nav-bar">
				<a  href="#login">Log In</a>
				<a  href="#home">All Vinyl</a>
        		<a  href="#vinyl/postVinyl">Post Vinyl</a>
        		<a  href="#trades/allTrades">All Trades</a>
        		<a  href="#login" onClick={ACTIONS.logUserOut} >Log Out</a>
        		
			</div>
			

			)
	}
})

export default NavBar