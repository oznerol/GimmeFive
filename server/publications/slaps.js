Meteor.publishComposite("slaps", function() {
  return {
    find: function() {
      return Slaps.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});

Meteor.publish('slapsWithCounts', function(userId) {
  Counts.publish(this, 'totalHigh', Slaps.find({slapperId: {$ne:null}, direction:true}), { noReady: true });
  Counts.publish(this, 'totalLow', Slaps.find({slapperId: {$ne:null}, direction:false}), { noReady: true });
  Counts.publish(this, 'totalSlow', Slaps.find({slapperId: null}), { noReady: true });
  Counts.publish(this, 'myFives', Slaps.find({creatorId: userId, slapperId: {$ne:null}}), { noReady: true });
  Counts.publish(this, 'myFivers', Slaps.find({slapperId: userId}), { noReady: true });
  return Slaps.find({slapperId:null}, 
        {
            sort: { createdAt: -1 },
            limit: 10
        });
});


Meteor.publishComposite("slapsForUser", function(userId) {
  return {
    find: function() {
      return Slaps.find({$or: [{creatorId: userId}, {slapperId: userId}]}, { sort: { createdAt: 1 }
                        });
    }
  }
});

Meteor.publishComposite("openSlaps", function(userId) {
  return {
    find: function() {
      return Slaps.find({slapperId: null}, { sort: { createdAt: 1 }
                        });
    }
  }
});