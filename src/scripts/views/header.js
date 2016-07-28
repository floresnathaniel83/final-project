import React from 'react'
import ACTIONS from '../actions'

const Header = React.createClass({
	render: function() {
		return (
			<div id="headerContainer">
				<h1>Record Pal</h1>
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
        href="#" onClick={ACTIONS.logUserOut} >Log Out</a>
			</div>
			)
	}
})

export default Header