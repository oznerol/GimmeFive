var myInterval;

Template.home.rendered = function() {
    Session.set('slapDir', null);
    Session.set('slapId', null);
    Session.set('myInverval', 0);
    Meteor.clearInterval(myInterval);
    Session.set('failed', false);
};

Template.home.destroyed = function() {
    Meteor.clearInterval(myInterval);
    Session.set('slapDir', null);
    Session.set('slapId', null);
    Session.set('myInverval', 0);
    Meteor.clearInterval(myInterval);
    Session.set('failed', false);
  };


Template.home.helpers({
  items: function() {
    return Items.find();
  },

  hangingGifs: function(){
    var urlArray = ['http://i.giphy.com/9MGNxEMdWB2tq.gif',
                    'http://i.giphy.com/xIhGpmuVtuEpi.gif',
                    'http://i.giphy.com/11GUWw92BSGXaU.gif'
                    ];
    var gifURL = urlArray[Math.floor(Math.random() * urlArray.length)];
    return gifURL;
  },
  waitingGifs: function(){
    var urlArray = ['http://wac.450f.edgecastcdn.net/80450F/thefw.com/files/2013/01/ZoEY81.jpg'
                    ];
    var gifURL = urlArray[Math.floor(Math.random() * urlArray.length)];
    return gifURL;
  },

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
  myFives: function()
  {
    return Counts.get('myFives');
    //return Slaps.find({$or: [{creatorId: Meteor.userId()}, {slapperId: Meteor.userId()}]}).count;
  },
  myFivers: function()
  {
    return Counts.get('myFivers');
  },

  slaps: function() {
    return Slaps.find({slapperId: null}, { sort: { createdAt: 1 }
                        });
  },
	itemCreator: function() {
	    // We use this helper inside the {{#each posts}} loop, so the context
	    // will be a post object. Thus, we can use this.authorId.
	    return Meteor.users.findOne(this.creatorId);
	},

  slapText: function(){
    var index = Session.get('myInverval');
    switch(index)
    {
      case 0:
      case 1:
        return ' Finding a virtual hand to slap...';
        break;
      case 2:
        return ' Still looking...';
        break;
      case 3:
        return ' Arm getting tired...';
        break;
      default:
        Session.set('failed', true);
        return 'Boo';
        break;
    }
  },

  hangingText: function(){
    var textArray = ['You were left hanging! You can keep your virtual hand out or...'
                    ];
    var text = textArray[Math.floor(Math.random() * textArray.length)];
    return text;
  },

  failedSlap: function(){
    var fail = Session.get('failed');
    if(fail)
    {

      return true;
    }

    return false;
  },

  mySlap: function(){
    var dir = Session.get('slapDir');
    var id = Session.get('slapId');
    if(id)
    {
      var slap = Slaps.findOne({_id:id});
      //console.log(slap);

      if(slap.slapperId)
      {
          Session.set('slapDir', null);
          Session.set('slapId', null);
          Router.go('slap');
      }else{
          //console.log("waiting on " + slap._id);
          return false;
     } 
    }
    else
    {
      return true;
    }
  }

});


Template.home.events({
  "click .downlow": function(e, tpl){
  	e.preventDefault();
    //console.log("tooslow!");

    Session.set('myInverval', 0);
    Meteor.clearInterval(myInterval);
    myInterval = Meteor.setInterval( function () 
    {
        var index = Session.get('myInverval');
        Session.set('myInverval', index+1);
    }, 8000 );


    var slap = Slaps.findOne({creatorId: {$ne: Meteor.userId()}, direction:false, slapperId:null});
    if(slap)
    {
      Session.set('slapId', slap._id);
      Session.set('slapDir', 'low');
      Meteor.call('Slaps.update', slap._id, function(error, response) {
        if (error) {
          console.log(error.reason);
        }
        else
        {
          //console.log(response);
        }
      });
    }
    else
    {
      var mySlap = {
                    creatorId: Meteor.userId(), 
                    direction: false
                  };
      Meteor.call('Slaps.insert', mySlap, function(error, response) {
        if (error) {
          console.log(error.reason);
        }
        else
        {
          //console.log('created new low slap... ' + response);
          Session.set('slapId', response);
          Session.set('slapDir', 'low');
        }
      });
    }
  },

  "click .uptop": function(e, tpl){
    e.preventDefault();
    //console.log("uptop!");

    Session.set('myInverval', 0);
    Meteor.clearInterval(myInterval);
    myInterval = Meteor.setInterval( function () 
    {
        var index = Session.get('myInverval');
        Session.set('myInverval', index+1);
    }, 8000 );

    var slap = Slaps.findOne({creatorId: {$ne: Meteor.userId()}, direction:true, slapperId:null});
    if(slap)
    {
      Session.set('slapId', slap._id);
      Session.set('slapDir', 'high');

      Meteor.call('Slaps.update', slap._id, function(error, response) {
        if (error) {
          console.log(error.reason);
        }
        else
        {
          //console.log(response);
        }
      });
    }
    else
    {
      var mySlap = {
                    creatorId: Meteor.userId(), 
                    direction: true
                  };
      Meteor.call('Slaps.insert', mySlap, function(error, response) {
        if (error) {
          console.log(error.reason);
        }
        else
        {
          //console.log('created new high slap... ' + response);
          Session.set('slapId', response);
          Session.set('slapDir', 'high');
        }
      });
    }
  },

  "click .continue": function(e, tpl){
    e.preventDefault();
    Session.set('slapDir', null);
    Session.set('slapId', null);
    Session.set('myInverval', 0);
    Meteor.clearInterval(myInterval);
    Session.set('failed', false);
  },





  // the following are for debug //

  "click .clear": function(e, tpl){
    e.preventDefault();
    console.log(Meteor.userId());
    Meteor.call('Slaps.clear', function(error, response) {
      if (error) {
        console.log(error.reason);
      }
      else
      {
        console.log(response);
      }
    });
  },

  "click .populate": function(e, tpl){
    e.preventDefault();
    console.log(Meteor.userId());
    var dir = Math.random()<.5;
    var someID = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        someID += possible.charAt(Math.floor(Math.random() * possible.length));


    var mySlap = {
                    creatorId: someID, 
                    direction: dir
                  };

    Meteor.call('Slaps.insert', mySlap, function(error, response) {
      if (error) {
        console.log(error.reason);
      }
      else
      {
        console.log(response);
      }
    });
  },

  "click .completed": function(e, tpl){
    e.preventDefault();
    console.log(Meteor.userId());
    var dir = Math.random()<.5;
    var someID = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        someID += possible.charAt(Math.floor(Math.random() * possible.length));


    var mySlap = {
                    creatorId: someID, 
                    slapperId: '1234',
                    direction: dir
                  };

    Meteor.call('Slaps.insert', mySlap, function(error, response) {
      if (error) {
        console.log(error.reason);
      }
      else
      {
        console.log(response);
      }
    });
  },

  "click .closeout": function(e, tpl){
    e.preventDefault();
    e.preventDefault();
    //console.log(this._id);
    Meteor.call('Slaps.update', this._id, function(error, response) {
      if (error) {
        console.log(error.reason);
      }
      else
      {
        console.log(response);
      }
    });
  }
});