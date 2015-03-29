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