Slaps.allow({
  'insert': function(userId, doc) {
    //return userId;
    return false;
  },
  'update': function(userId, doc, fields, modifier) {
    //return userId;
    return false;
  },
  'remove': function(userId, doc) {
    //return userId;
    return false;
  }
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});
