HomeController = AppController.extend({
  waitOn: function() {
    return this.subscribe('slaps');
  },
  data: {
  	slaps: Slaps.find({})
  }
});
