import React from 'react'
import ACTIONS from '../ACTIONS'
//adjust styling to landing page layout may copy facebook or instagram or make my own with full background image
const LoginView = React.createClass({
	render: function() {
		return (
			<div className="login-view">
				<Header />
				<RegisterBox />
				<Footer />
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
 				<h1>vinyl pi</h1>
 				<form id='login-box'onSubmit={this._handleLogin} >
					<input className='input-loginbox' type="email" name="email" placeholder="enter your email" />
					<input className='input-loginbox'type="password" name="password" placeholder="enter a password" />
					<button id='login-button'type="submit">Log In</button>

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
			<div className="register">
				<div className='app-content'>
					<h2>Connect with other unique vinyl lovers around the world on Vinyl Pi</h2>
					<ul>
						<li>Post and share your record collection. </li>
						<li>Find records from other collectors and trade with them.</li>
						<li>Stop listening to streaming music and get the real stuff with a warmer sound. Touch it, see it, feel it.</li>
						
					</ul>
				</div>
				<form id='register-box' onSubmit={this._handleRegister} >
					<h3>Sign Up</h3>
					<h4>Share your collecting journey.</h4>
					<input className='input-registerbox' type="text" name="name" placeholder="enter your name" />
					<input className='input-registerbox' type="email" name="email" placeholder="enter your email" />
					<input className='input-registerbox' type="password" name="password" placeholder="enter a password" />
          			<input className='input-registerbox' type="text" name="genreTags" placeholder="enter your fav genres" />
          			<p>How did you get into collecting records?</p>
          			<input className='input-registerbox' type="text" name="journeyDesc" />
          			<p>What is one record that got away that you wished you bought?</p>
          			<input className='input-registerbox' type="text" name="vinylMissed" />
          			<p>What is the best dollar bin record you bought?</p>
          			<input className='input-registerbox' type="text" name="vinylDollar" />
					<button id='register-button'type="submit">Create Account</button>
				</form>
			</div>

			)
	}
})

const Footer = React.createClass({
	render: function() {
		return(
				<footer>
					<h3 id="trademark">© 2016 Vinyl Pi.</h3>

				</footer>

			)

	}


})

export default LoginView