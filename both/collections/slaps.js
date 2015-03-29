Slaps = new Mongo.Collection('slaps');

Slaps.helpers({

});

Slaps.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  //doc.creatorId = userId;
});
