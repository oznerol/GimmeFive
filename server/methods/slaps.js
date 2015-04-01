Meteor.methods({
  'Slaps.insert': function (params) {
    return Slaps.insert(params);
  },
  'Slaps.clear': function () {
    Slaps.remove({});
    return 'all clear!';
  },
  'Slaps.update': function (slapId) {
    Slaps.update({_id: slapId}, {$set: {slapperId:Meteor.userId(), 
                                        updatedAt:moment().toDate()}});
    return 'updated!';
  },
  'username.set': function (userId, name) {
    check(name, String);
    check(userId, String);

    Meteor.users.update({_id: userId}, {$set: {"profile.name":name}});
    return 'username changed!';
  },

  'stats.slapCreators' : function(limit)
  {
     return Slaps.aggregate(
      // Limit matching documents (can take advantage of index)
      [{ 
        $match: 
          {
            "creatorId": {$ne: null},
            "slapperId": {$ne: null}
          }
      },
      // Group by the answer values
      { $group: {
          _id: "$creatorId",
          slaps: { $sum: 1 }
      }},
      {
        $sort: {slaps: -1}
      },
      {
        $limit: limit
      }]
    );
  },

  'stats.slapGivers' : function(limit)
  {
     return Slaps.aggregate(
      // Limit matching documents (can take advantage of index)
      [{ 
        $match: 
          {
            "creatorId": {$ne: null},
            "slapperId": {$ne: null}
          }
      },
      // Group by the answer values
      { $group: {
          _id: "$slapperId",
          slaps: { $sum: 1 }
      }},
      {
        $sort: {slaps: -1}
      },
      {
        $limit: limit
      }]
    );
  },

  'stats.mySlapsReceived' : function(userId, limit)
  {
     return Slaps.aggregate(
      // Limit matching documents (can take advantage of index)
      [{ 
        $match: 
          {
            "creatorId": userId,
            "slapperId": {$ne: null}
          }
      },
      // Group by the answer values
      { $group: {
          _id: "$slapperId",
          slaps: { $sum: 1 }
      }},
      {
        $sort: {slaps: -1}
      },
      {
        $limit: limit
      }]
    );
  },

  'stats.mySlapsGiven' : function(userId, limit)
  {
     return Slaps.aggregate(
      // Limit matching documents (can take advantage of index)
      [{ 
        $match: 
          {
            "slapperId": userId
          }
      },
      // Group by the answer values
      { $group: {
          _id: "$creatorId",
          slaps: { $sum: 1 }
      }},
      {
        $sort: {slaps: -1}
      },
      {
        $limit: limit
      }]
    );
  }


});
