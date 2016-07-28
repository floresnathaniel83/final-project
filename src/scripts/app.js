import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import Dashboard from './views/dashboard'
import LoginView from './views/loginView'
import ComposeView from './views/composeView'
import Header from './views/header'
import {User, VinylModel} from './models/models'

//app_name = finalproject
const app = function() {
  
  var AppRouter = Backbone.Router.extend({
  		routes: {
  			'home': 'goHome',
        	'login': 'handleLogin',
        	'vinyl/postVinyl': 'handleCompose',
        	'vinyl/shelf':'handleShelf',
  			'*catchall': 'redirectHome'
		},

		handleCompose: function () {
			ReactDOM.render(<ComposeView />, document.querySelector('.container'))


		},

		handleShelf: function () {
			ReactDOM.render(<Dashboard routedFrom='vinyl/shelf' />, document.querySelector('.container'))

		},

		goHome: function() {
			ReactDOM.render(<Dashboard  />, document.querySelector('.container'))

		},

		handleLogin: function() {
			ReactDOM.render(<LoginView />, document.querySelector('.container'))

		},

		redirectHome: function () {
			location.hash = 'home'

		}, 
  	 	
  	 	initialize: function() { 
            Backbone.history.start()
            this.on('route', function (handlerName) {
                if(!User.getCurrentUser()) {
                    location.hash = 'login'
                } 
			})
		}

	})
  	new AppRouter()
}



// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..