var myInterval;

Template.home.rendered = function() {
    Session.set('slapDir', null);
    Session.set('slapId', null);
    Session.set('myInverval', 0);
    Meteor.clearInterval(myInterval);
    Session.set('failed', false);
};

Template.home.destroyed = function() {

  // TODO - check to see if was waiting for a Five, and if so, close it out to
  // permanently leave hanging

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
                    'http://i.giphy.com/11GUWw92BSGXaU.gif',
                    'http://i.giphy.com/ho7KMYYb6SqSQ.gif',
                    'http://i.giphy.com/DYvroxifyHEmA.gif',
                    'http://i.giphy.com/cmoNALBONaM48.gif',
                    'http://i.giphy.com/P4nUnWddzFrt6.gif',
                    'http://i.giphy.com/Kc7zZVIGZXjeo.gif',
                    'http://i.giphy.com/bcNGLldUgd6U.gif',
                    'http://i.giphy.com/sczX87s3zgWWY.gif'
                    ];
    var gifURL = urlArray[Math.floor(Math.random() * urlArray.length)];
    return gifURL;
  },
  waitingGifs: function(){
    var urlArray = ['http://wac.450f.edgecastcdn.net/80450F/thefw.com/files/2013/01/ZoEY81.jpg',
                    'http://cdn.acidcow.com/pics/20100506/animals_giving_high_five_02.jpg',
                    'http://tech.mn/files/2013/10/baby_panda.jpg',
                    'https://41.media.tumblr.com/676d8e3057e756948590ab0777b12de8/tumblr_n7mtrt9lki1qbzdzno2_500.jpg',
                    'http://blogs.discovery.com/.a/6a00d8341bf67c53ef01287620b58b970c-800wi',
                    'http://www.myfunnypets.net/wp-content/uploads/2010/11/high-five1.jpg',
                    'http://aminus3.s3.amazonaws.com/image/g0008/u00007865/i00889598/6f00f9c4fda8cc98e295d20366a174c2_large.jpg',
                    'http://media.kids-myshot.nationalgeographic.com/2011/11/4ece73a8a87bdSerenity_pics_2_114_large_medium.JPG',
                    'https://c1.staticflickr.com/1/132/399759444_ab18cb6a0f.jpg',
                    'http://cdn.cutestpaw.com/wp-content/uploads/2013/09/l-High-five.jpg',
                    'http://thumbpress.com/wp-content/uploads/2013/05/Internet-High-Five.jpeg',
                    'http://cdn-www.i-am-bored.com/media/thumbnails/InternetHighFive_zpsa9260a11[1].png',
                    'http://www.desmondandthetutus.co.za/HighFive/images/index_02.jpg',
                    'https://librarianbeta.files.wordpress.com/2013/08/highfive.png'
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
  myFivers: function()
  {
    return Counts.get('myFivers');
    //return Slaps.find({$or: [{creatorId: Meteor.userId()}, {slapperId: Meteor.userId()}]}).count;
  },
  myFives: function()
  {
    return Counts.get('myFives');
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

      if(slap && slap.slapperId)
      {
          Session.set('slapDir', null);
          Session.set('slapId', null);
          Router.go('slap', {_id: slap._id});
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


    var slap = Slaps.findOne({creatorId: {$ne: Meteor.userId()}, direction:false, slapperId:null},
      {
            sort: { createdAt: -1 },
        });
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

    var slap = Slaps.findOne({creatorId: {$ne: Meteor.userId()}, direction:true, slapperId:null},
      {
            sort: { createdAt: -1 },
        });
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