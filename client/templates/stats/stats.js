Template.stats.rendered = function() {
   
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
});