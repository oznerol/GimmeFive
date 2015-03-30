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
});
