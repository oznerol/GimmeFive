SlapController = AppController.extend({
  waitOn: function() {
    
    return this.subscribe('openSlaps');
  },
  data: {
    slaps: Slaps.find({})
  },
  onBeforeAction: function () {
    //console.log(this.params.query.slap);
    this.next();
  },
  onAfterAction: function () {
    Meta.setTitle('GiveMeFive!');
  }
});

SlapController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
