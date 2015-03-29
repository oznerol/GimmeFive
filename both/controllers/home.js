HomeController = AppController.extend({
  waitOn: function() {
    return this.subscribe('slapsWithCounts', Meteor.userId());
  },
  data: {
  	slaps: Slaps.find({})
  }
});
