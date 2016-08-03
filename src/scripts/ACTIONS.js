import {User, VinylModel, VinylCollection, TradesModel, TradesCollection} from './models/models'
import TRADE_STORE from './STORE'

const ACTIONS = {
	registerUser: function (userObj) {
		User.register(userObj).then(
			()=>this.logUserIn(userObj.email, userObj.password),
			(err)=>{
				console.log(err)
				alert('failure to register')
			})
	},

	logUserIn: function (email, password){
		User.login(email, password).then(
			()=> {
					alert(`user ${email} logged in!`)
					location.hash='home'
				},
				
				(err)=> {

					alert('failure logging in')
					console.log(err)
				})
		
		},
	
	logUserOut: function() {
		User.logout().then(
			()=> location.hash='login'
		)
	},

	saveVinyl: function(vinylObj) {
        var vinyl = new VinylModel(vinylObj)
        vinyl.save().then(
            (responseData) => {
                alert('Thanks for submitting!!!')
                location.hash = 'home'
                console.log(responseData)
            },
            
            (error) => {
                alert('FAILURE')
                console.log(error)
            }
        )
     },

     selectVinylToOffer: function (model) {
     	console.log('model to be set on state >>>', model)
     	TRADE_STORE._set('vinylOffered', model)
     },

     saveTrades: function(tradesObj) {
        var trade = new TradesModel(tradesObj)
        trade.save().then(
            (responseData) => {
                alert('making the offer!!!')
                location.hash = 'home'
                console.log(responseData)
            },
            
            (error) => {
                alert('FAILURE')
                console.log(error)
            }
        )



    },
    //>>> builds query strings
    //>>> /api/vinyl?ownerId=«_id»
	fetchVinyl: function (queryObj) {
		//console.log(queryObj)
		TRADE_STORE.data.vinylCollection.fetch({
			data: queryObj
		})

	},

	fetchSingleVinyl: function (queryObj) {
		//console.log(queryObj)
		TRADE_STORE.data.vinylModel.fetch({
			url: 'api/vinyl/' + queryObj.vinylId
		})
	},


	//>>>remember a .then is asychronous function, once the response comes back execute and you can test if client server relationship is working with success failure functions
	//>>> builds query strings
	//>>> /api/users
	fetchUsers: function (queryObj) {
		TRADE_STORE.data.userCollection.fetch({
			data: queryObj

		})

	}
}

export default ACTIONS