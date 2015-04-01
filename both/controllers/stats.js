StatsController = AppController.extend({
  waitOn: function() {
    return this.subscribe('slapCounts', Meteor.userId());
  },
  data: {
    //slaps: Slaps.find({})
  },
  onBeforeAction: function () {
    //console.log(this.params.query.slap);
    this.next();
  },
  onAfterAction: function () {
    //Meta.setTitle('Gimme Five!');
  }
});

StatsController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
