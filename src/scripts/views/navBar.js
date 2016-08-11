import React from 'react'
import ACTIONS from '../actions'
import {User} from '../models/models'



const NavBar = React.createClass({
	render: function() {

		return (
			<div id="navBar">
				<a className="button button-primary" href="#login">Log In</a>
				<a className="button button-primary" href="#home">All Vinyl</a>
        		<a className="button button-primary" href="#vinyl/postVinyl">Post Vinyl</a>
        		<a className="button button-primary" href="#trades/allTrades">All Trades</a>
        		<a className="button button-primary" href="#login" onClick={ACTIONS.logUserOut} >Log Out</a>
        		
			</div>
			

			)
	}
})

export default NavBar