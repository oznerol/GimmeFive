Template.slap.rendered = function() {

};

Template.slap.helpers({

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
                    'http://i.giphy.com/MoQiYAaIqADss.gif'
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