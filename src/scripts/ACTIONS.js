import {User, VinylModel, VinylCollection, TradesModel, TradesCollection} from './models/models'
import TRADE_STORE from './STORE'
import toastr from 'toastr'


//controls modifications or changes sends new shit to the store(stop chilling set the new shit on your state) 
//actions are like the file clerk
const ACTIONS = {
	registerUser: function (userObj) {
		User.register(userObj).then(
			()=>this.logUserIn(userObj.email, userObj.password),
			(err)=>{
				console.log(err)
				toastr.error('failure to register')
			})
	},

	logUserIn: function (email, password){
		User.login(email, password).then(
			()=> {
					toastr.info(`user ${email} logged in!`)
					location.hash='home'
				},
				
				(err)=> {

					toastr.error('failure logging in')
					location.hash='login'
					console.log(err)
				})
		
		},
	
	logUserOut: function() {
		User.logout().then(
			()=> location.hash='login'
		)
	},

	selectVinylToOffer: function (model) {
     	TRADE_STORE._set('vinylOffered', model)
     },

     saveVinyl: function(vinylObj) {
        var vinyl = new VinylModel(vinylObj)
        vinyl.save().then(
            (responseData) => {
                toastr.success('Thanks for submitting!!!')
                location.hash = 'home'
                console.log(responseData)
            },
            
            (error) => {
                toastr.error('FAILURE')
                console.log(error)
            }
        )
     },

     saveTrades: function(tradesObj) {
        var trade = new TradesModel(tradesObj)
        trade.save().then(
            (responseData) => {
                toastr.success('making the offer!!!')
                location.hash = 'home'
                console.log(responseData)
            },
            
            (error) => {
                toastr.error('FAILURE')
                console.log(error)
            }
        )
    },

    acceptTrades: function(tradesModel) {
    	tradesModel.set({
    		accepted: 'yes'

    	})
    	tradesModel.save()
    	TRADE_STORE.data.tradesCollection.fetch().then(
            (responseData) => {
                toastr.success('accepting trades!!!')
                console.log(responseData)
            },
            
            (error) => {
                toastr.error('FAILURE')
                console.log(error)
            }
        )

    },

    rejectTrades: function(tradesModel) {
    	tradesModel.set({
    		accepted: 'no'

    	})
    	tradesModel.save()
    	TRADE_STORE.data.tradesCollection.fetch().then(
            (responseData) => {
                toastr.success('rejecting trades!!!')
                console.log(responseData)
            },
            
            (error) => {
                toastr.error('FAILURE')
                console.log(error)
            }
        )
    		

    },

    pendingTrades: function(tradesModel) {
    	tradesModel.set({
    		accepted: 'pending'

    	})
    	tradesModel.save()
    	TRADE_STORE.data.tradesCollection.fetch().then(
            (responseData) => {
                toastr.success('pending trades!!!')
                console.log(responseData)
            },
            
            (error) => {
                toastr.error('FAILURE')
                console.log(error)
            }
        )
    		

    },
 
    fetchTrades: function (queryObj) {
	 	TRADE_STORE.data.tradesCollection.fetch({
			data: queryObj
		})
	 },

	 deleteTrades: function (model) {
	 	model.destroy().then(
            (responseData) => {
                toastr.success('deleting trade!!!')
                console.log(responseData)
            },
            
            (error) => {
                toastr.error('FAILURE')
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
		}).then(
            (responseData) => {
                toastr.success('getting vinyl!!!')
                console.log(responseData)
            },
            
            (error) => {
                toastr.error('FAILURE')
                console.log(error)
            }
        )

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

	},

	fetchSingleUser: function (id) {
		TRADE_STORE.data.userModel.fetch({
			url: 'api/users/' + id
		})

	}
}

export default ACTIONS