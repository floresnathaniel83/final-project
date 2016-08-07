import React from 'react'
import ACTIONS from '../actions'
import {User} from '../models/models'

const Header = React.createClass({

	render: function() {
		return (
			<div id="headerContainer">
				<h1>Vinyl Pi</h1>
				<img className = "headerImg" src= 'http://www.clipartbest.com/cliparts/ncX/8aK/ncX8aK8ri.jpeg' />

				<NavBar />
			</div>
			)
	}
})

const NavBar = React.createClass({
	render: function() {
		return (
			<div id="navBar">
				<a className="button button-primary"
        href="#login">Log In</a>
				<a className="button button-primary"
        href="#home">Home</a>
        		<a className="button button-primary"
        href="#vinyl/postVinyl">Post Vinyl</a>
        		<a className="button button-primary" 
        href="#trades/allTrades">All Trades</a>
        		<a className="button button-primary"
        href="#" onClick={ACTIONS.logUserOut} >Log Out</a>
			</div>
			)
	}
})

export default Header