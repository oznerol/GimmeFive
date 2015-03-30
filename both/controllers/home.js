HomeController = AppController.extend({
  waitOn: function() {
    return [this.subscribe('slapsWithCounts', Meteor.userId()),
    		this.subscribe('slapsForUser', Meteor.userId())];
  },
  data: {
  	slaps: Slaps.find({})
  }
});
