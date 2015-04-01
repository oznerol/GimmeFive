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

  Meteor.call('stats.slapHangers', 10, function(error, response) {
        if (error) {
          console.log(error.reason);
        }
        else
        {
          Session.set('leaderHang', response);
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
  totalWaiting: function()
  {
    return Counts.get('totalWaiting');
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
  leaderHang: function()
  {
    return Session.get('leaderHang');
  },
  myId: function()
  {
    return Meteor.userId();
  },
  getUserName: function()
  {
    var userName = 'Anonymous';
    var user = Meteor.users.findOne({_id: this._id},
        { 
          fields: { profile: 1 } 
        });

    if(user)
    {
      if(user.profile.name)
        userName = user.profile.name;
      else
        userName += ' (' + user._id.substring(0,3) + '...)';
    }
    
    return userName;
  }
});

Template.stats.events({

});