HomeController = AppController.extend({
  waitOn: function() {
    return [this.subscribe('slaps', Meteor.userId()),
    		this.subscribe('slapsForUser', Meteor.userId()),
    		this.subscribe('currentUser', Meteor.userId())];
  },
  data: {
  	slaps: Slaps.find({})
  }
});
