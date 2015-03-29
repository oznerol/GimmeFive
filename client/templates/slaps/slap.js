Template.slap.rendered = function() {

};

Template.slap.helpers({

  slaps: function() {
    return Slaps.find();
  },
  slap: function(){
  	return Slaps.findOne();
  }
});

Template.slap.events({
	"click .continue": function(e, tpl){
  	e.preventDefault();
    Router.go('home');
  }
});