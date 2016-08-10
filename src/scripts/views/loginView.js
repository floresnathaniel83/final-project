import React from 'react'
import ACTIONS from '../ACTIONS'

const LoginView = React.createClass({
	render: function() {
		return (
			<div className="loginView">
				<Header />
				<RegisterBox />
				<LoginBox />

			</div>
			)
	}
})

const Header = React.createClass({

	render: function() {
		return (
			<div className="page-header">
 				<h1>Vinyl Pi<p>π</p></h1>
			
			</div>
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
				<h3>"THE MORE INFORMATION ONE CAN GATHER ABOUT A PARTICULAR SUBJECT, THE GREATER THE UNDERSTANDING WILL BE. THE VINYL RECORD IS FREQUENTLY THE ONLY PROOF THAT A CREATIVE HUMAN EVENT ACTUALLY TOOK PLACE."</h3>

				<form onSubmit={this._handleRegister} >
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

const LoginBox = React.createClass({
	_handleLogin: function(evt) {
		evt.preventDefault()
		ACTIONS.logUserIn(evt.target.email.value,evt.target.password.value)
	},

	render: function() {
		return (
			<div className="loginBox login">
				<form onSubmit={this._handleLogin} >
					<h3>Log in</h3>
					<input type="email" name="email"
          placeholder="enter your email" />
					<input type="password" name="password"
          placeholder="enter a password" />
					<button type="submit">log in!</button>
				</form>
			</div>
			)
	}
})



export default LoginView