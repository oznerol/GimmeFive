Meteor.publishComposite("slaps", function(userId) {
  return {
    find: function() {
      return Slaps.find({creatorId: {$ne: userId}, slapperId:null, hanging:null}, 
        {
            sort: { createdAt: 1 },
            limit: 10
        });
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

Meteor.publishComposite("currentUser", function(userId) {
  return {
    find: function() {
      return Meteor.users.find({_id: userId}, 
        { 
          limit: 1, 
          fields: { 
                      profile: 1 
                    } 
        });
    }
  }
});

Meteor.publish('slapsWithCounts', function(userId) {
  Counts.publish(this, 'totalHigh', Slaps.find({slapperId: {$ne:null}, direction:true}), { noReady: true });
  Counts.publish(this, 'totalLow', Slaps.find({slapperId: {$ne:null}, direction:false}), { noReady: true });
  Counts.publish(this, 'totalSlow', Slaps.find({slapperId: null}), { noReady: true });
  Counts.publish(this, 'myFivers', Slaps.find({creatorId: userId, slapperId: {$ne:null}}), { noReady: true });
  Counts.publish(this, 'myFives', Slaps.find({slapperId: userId}), { noReady: true });
  return {
    find: function(){
      return Slaps.find({creatorId: {$ne: userId}, slapperId:null}, 
        {
            sort: { createdAt: 1 },
            limit: 10
        });
    }
  }
});

Meteor.publish('slapCounts', function(userId) {
  Counts.publish(this, 'totalHigh', Slaps.find({slapperId: {$ne:null}, direction:true}));
  Counts.publish(this, 'totalLow', Slaps.find({slapperId: {$ne:null}, direction:false}));
  Counts.publish(this, 'totalSlow', Slaps.find({slapperId: null, hanging:true}));
  Counts.publish(this, 'totalWaiting', Slaps.find({slapperId: null, hanging:null}));
  Counts.publish(this, 'myFivers', Slaps.find({creatorId: userId, slapperId: {$ne:null}}));
  Counts.publish(this, 'myFives', Slaps.find({slapperId: userId}));

  
  return Meteor.users.find(
                      {  },
                      { fields: { profile: 1 } });
});


Meteor.publish('mySlaps', function(userId) {
  return {
    find: function(){
      return Slaps.find({creatorId: userId}, 
        {
            sort: { createdAt: -1 },
            limit: 3
        });
    }
  }
});

Meteor.publishComposite("slapWithId", function(slapId) {
  return {
    find: function() {
      return Slaps.find({_id: slapId}, { sort: { createdAt: 1 }
                        });
    },
    children: [
        {
            find: function(slap) {
                // Find post author. Even though we only want to return
                // one record here, we use "find" instead of "findOne"
                // since this function should return a cursor.
                return Meteor.users.find(
                      { _id: slap.creatorId },
                      { limit: 1, fields: { profile: 1 } });
            }
        },
        {
            find: function(slap) {
                // Find post author. Even though we only want to return
                // one record here, we use "find" instead of "findOne"
                // since this function should return a cursor.
                return Meteor.users.find(
                      { _id: slap.slapperId },
                      { limit: 1, fields: { profile: 1 } });
            }
        }]
  }
});

Meteor.publishComposite("slapsForUser", function(userId) {
  return {
    find: function() {
      return Slaps.find({$or: [{creatorId: userId}, {slapperId: userId}]}, 
        { sort: { createdAt: -1 },
          limt: 3 
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