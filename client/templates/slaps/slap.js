Template.slap.rendered = function() {

};

Template.slap.helpers({

  slapId: function() {
    var controller = Iron.controller();

    // reactively return the value of postId
    return controller.state.get('slapId');
  },

  oneSlap: function() {
    //console.log('calling find2');
    var result = Slaps.findOne();
    if(!result)
      result = false;

    return result;
  },

  slapReceiver: function() {
      var person = Meteor.users.findOne(this.creatorId);
      var name = 'unknown';

      if(person)
      {
          if(person.profile.name)
            name = person.profile.name;
          else if(person._id)
          {
            name = person._id;
            name = name.substring(0,5) + '...';
          }
      }

      return name;
  },
  slapGiver: function() {
      var person = Meteor.users.findOne(this.slapperId);
      var name = 'unknown';

      if(person)
      {
          if(person.profile.name)
            name = person.profile.name;
          else if(person._id)
          {
            name = person._id;
            name = name.substring(0,5) + '...';
          }
      }

      return name;
  },

  slaps: function() {
    return Slaps.find();
  },
  slap: function(){
  	return Slaps.findOne();
  },
  fiveGifs: function(){
    var urlArray = ['http://i.giphy.com/r2BtghAUTmpP2.gif', 
                    'http://31.media.tumblr.com/b9fee71336fcb2a9121de629ed3310ca/tumblr_n4iq9ceOMX1qmj83do1_400.gif', 
                    'http://i.giphy.com/gXBmPuqnc4cve.gif',
                    'http://i.giphy.com/tG6fR8PLIDOQU.gif',
                    'http://i.giphy.com/4SS0kfzRqfBf2.gif',
                    'http://i.giphy.com/DohrJX1h2W5RC.gif',
                    'http://i.giphy.com/oyf3O9G6wAn28.gif',
                    'http://i.giphy.com/MoQiYAaIqADss.gif',
                    'http://i.giphy.com/m6BXPlP86xeSs.gif',
                    'http://i.giphy.com/Ctq1dz7dpHCY8.gif',
                    'http://i.giphy.com/2FazevvcDdyrf1E7C.gif',
                    'http://i.giphy.com/dLuI7v4QXx5SM.gif',
                    'http://i.giphy.com/uKRJBCO4ToGaY.gif',
                    'http://i.giphy.com/C4lSxWjqSJLfG.gif',
                    'http://i.giphy.com/vGsPkpzkQYrTy.gif',
                    'http://i.giphy.com/M9TuBZs3LIQz6.gif',
                    'http://i.giphy.com/LdnaND03GRE9q.gif',
                    'http://i.giphy.com/mHEes6Quf8XK0.gif',
                    'http://i.giphy.com/ZgDGEMihlZXCo.gif',
                    'http://i.giphy.com/BP9eSu9cnnGN2.gif',
                    'http://i.giphy.com/gdNlcJ1tAtiSI.gif',
                    'http://i.giphy.com/WPaCAamuP5dVS.gif',
                    'http://i.giphy.com/zl170rmVMCpEY.gif',
                    'http://i.giphy.com/It1gmYcfFzoNG.gif',
                    'http://i.giphy.com/pjAEUYukyEyDC.gif',
                    'http://i.giphy.com/6Cb3GJ8fxPt60.gif',
                    'http://i.giphy.com/10LNj580n9OmiI.gif'
                    ];
    var gifURL = urlArray[Math.floor(Math.random() * urlArray.length)];
    return gifURL;
  }
});

Template.slap.events({
	"click .continue": function(e, tpl){
  	e.preventDefault();
    Router.go('home');
  }
});