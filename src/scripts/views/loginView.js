import React from 'react'
import ACTIONS from '../ACTIONS'
//adjust styling to landing page layout may copy facebook or instagram or make my own with full background image
const LoginView = React.createClass({
	render: function() {
		return (
			<div className="loginView">
				<Header />
				<RegisterBox />

			</div>
			)
	}
})

const Header = React.createClass({
	_handleLogin: function(evt) {
		evt.preventDefault()
		ACTIONS.logUserIn(evt.target.email.value,evt.target.password.value)
	
	},

	render: function() {
		return (
			<header id="page-header">
				<h1 className='logo'>π</h1>
 				<h1>Vinyl Pi</h1>
 				<form id='loginBox'onSubmit={this._handleLogin} >
					<input type="email" name="email" placeholder="enter your email" />
					<input type="password" name="password" placeholder="enter a password" />
					<button type="submit">log in!</button>

				</form>
			
			</header>

			)
	}
})

const RegisterBox = React.createClass({

	_handleRegister: function(evt) {
		evt.preventDefault()
		ACTIONS.registerUser({
			  name: evt.currentTarget.name.value,
		      email: evt.currentTarget.email.value,
		      password: evt.currentTarget.password.value,
		      genreTags: evt.currentTarget.genreTags.value,
		      journeyDesc: evt.currentTarget.journeyDesc.value,
		      vinylMissed: evt.currentTarget.vinylMissed.value,
		      vinylDollar: evt.currentTarget.vinylDollar.value
		})
		
	},

	render: function() {
		return (
			<div className="loginBox register">
				<h3>Sign up to post your record collection and see records from other collectors and trade with them.</h3>

				<form id='registerBox' onSubmit={this._handleRegister} >
					<h3>Register</h3>
					<input type="text" name="name"
          placeholder="enter your name" />
					<input type="email" name="email"
          placeholder="enter your email" />
					<input type="password" name="password"
          placeholder="enter a password" />
          			<input type="text" name="genreTags" placeholder="enter your fav genres" />
          			<p>How did you get into collecting records?</p>
          			<input type="text" name="journeyDesc" />
          			<p>What is one record that got away that you wished you bought?</p>
          			<input type="text" name="vinylMissed" />
          			<p>What is the best dollar bin record you bought?</p>
          			<input type="text" name="vinylDollar" />
					<button type="submit">sign up!</button>
				</form>
			</div>
			)
	}
})

export default LoginView