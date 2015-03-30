SlapController = AppController.extend({
  waitOn: function() {
    this.state.set('slapId', this.params._id);
    return this.subscribe('slapWithId', this.params._id);
  },
  data: function () {
    //console.log('calling find3');
    return [Slaps.findOne({_id: this.params._id})
    ];
  },
  onBeforeAction: function () {
    //console.log(this.params.query.slap);
    this.next();
  },
  onAfterAction: function () {
    //Meta.setTitle('Gimme Five!');
  }
});

SlapController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
