Router.route('/', {
  name: 'home'
});

Router.route('slap',
{
  path: '/slap/:_id',
	name: 'slap',
	controller: 'SlapController',
	loadingTemplate: 'findingSlap'
});

Router.route('/about', {
  name: 'about'
});

Router.route('/stats', {
  name: 'stats'
});

/*
Router.route('/dashboard', {
  name: 'dashboard'
});

Router.route('/uptop', {
  name: 'uptop',
  controller: 'UpTopController'
});

Router.route('/downlow', {
  name: 'downlow',
  controller: 'DownLowController'
});
*/

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
