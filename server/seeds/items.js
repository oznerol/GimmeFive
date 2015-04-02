Meteor.startup(function() {

	// first, remove configuration entry in case service is already configured
	ServiceConfiguration.configurations.remove({
	  service: "twitter"
	});
	ServiceConfiguration.configurations.remove({
	  service: "password"
	});
	ServiceConfiguration.configurations.insert({
	  service: "twitter",
	  consumerKey: process.env.TWITTER_KEY,
	  loginStyle: "popup",
	  secret: process.env.TWITTER_SECRET
	});
	
	//var before = new Date();
	//before.setHours(before.getHours() - 2);
	//Accounts.removeOldGuests(before);
	//Accounts.removeOldGuests();
});
