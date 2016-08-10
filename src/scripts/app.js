import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import Dashboard from './views/dashboard'
import ShelfView from './views/shelfView'
import DetailView from './views/detailView'
import OfferView from './views/offerView'
import AllTradesView from './views/allTradesView'
import LoginView from './views/loginView'
import ComposeView from './views/composeView'
import NavBar from './views/navBar'
import {User, VinylModel} from './models/models'
//controls views(where the user is at in the app)

const app = function() {
  
  var AppRouter = Backbone.Router.extend({
  		routes: {
  			'home': 'goHome',
        	'login': 'handleLogin',
        	'vinyl/shelf/:ownerId':'handleShelf',
        	'vinyl/detail/:vinylId': 'handleDetail',
        	'vinyl/offer/:vinylId' : 'handleOffer',
        	'trades/allTrades' : 'handleAllTrades',
        	'vinyl/postVinyl' : 'handleCompose',
  			'*catchall': 'redirectHome'
		},

		handleCompose: function () {
			ReactDOM.render(<ComposeView />, document.querySelector('.container'))

		},

		handleShelf: function (ownerId) {
			ReactDOM.render(<ShelfView ownerId = {ownerId} />, document.querySelector('.container'))

		},

		handleDetail: function (vinylId) {
			ReactDOM.render(<DetailView vinylId = {vinylId} />, document.querySelector('.container'))

		},

		handleOffer: function (vinylId) {
			ReactDOM.render(<OfferView vinylId = {vinylId} />, document.querySelector('.container'))

		},

		handleAllTrades: function () {
			ReactDOM.render(<AllTradesView />, document.querySelector('.container'))

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
  	 		this.on('route', function (handlerName) {
                if(!User.getCurrentUser()) {
                    location.hash = 'login'
                } else {
					
					if (handlerName.toLowerCase().includes('login')) {
						location.hash = "home"
					}
				}
			})

            Backbone.history.start()
            
		}

	})
  	new AppRouter()
}



// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..