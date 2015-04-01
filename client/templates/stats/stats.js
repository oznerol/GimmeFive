Template.stats.rendered = function() 
{
  Meteor.call('stats.slapCreators', 10, function(error, response) {
        if (error) {
          console.log(error.reason);
        }
        else
        {
          Session.set('leaderReceive', response);
        }
      });

  Meteor.call('stats.slapGivers', 10, function(error, response) {
        if (error) {
          console.log(error.reason);
        }
        else
        {
          Session.set('leaderGive', response);
        }
      });
   
};

Template.stats.helpers({
  totalHigh: function(){
    return Counts.get('totalHigh');
  },
  totalLow: function()
  {
    return Counts.get('totalLow');
  },
  totalSlow: function()
  {
    return Counts.get('totalSlow');
  },
  myFivers: function()
  {
    return Counts.get('myFivers');
    //return Slaps.find({$or: [{creatorId: Meteor.userId()}, {slapperId: Meteor.userId()}]}).count;
  },
  myFives: function()
  {
    return Counts.get('myFives');
  },
  leaderReceive: function()
  {
    return Session.get('leaderReceive');
  },
  leaderGive: function()
  {
    return Session.get('leaderGive');
  },
  myId: function()
  {
    return Meteor.userId();
  }
});

Template.stats.events({

});