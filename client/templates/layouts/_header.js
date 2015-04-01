Template._header.helpers({
  currentUser: function() {
    return Meteor.users.findOne({_id:Meteor.userId()});
  }
});

Template._header.events({
  "click .navbar-nav li a": function(e, tpl){
    //e.preventDefault();
      tpl.$(".navbar-collapse").collapse('hide');
    },

  "click .twitter": function(e, tpl){
    e.preventDefault();
    Meteor.loginWithTwitter( function(err){

      if (err){
        console.log(err)
      }else{
        console.log("yeah");
     }
    });
  },

  "submit form.navbar-form": function(e, tpl){
  	e.preventDefault();
    
  	var myName = tpl.$("input[id='myName']").val();

  	if(myName)
  	{
  		Meteor.call('username.set', Meteor.userId(), myName , function(error, response) {
        if (error) {
          console.log(error.reason);
        }
        else
        {
          console.log(response);
        }
      });
  	}
  }
});