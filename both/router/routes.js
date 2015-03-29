Router.route('/', {
  name: 'home'
});

Router.route('/slap',
{
	name: 'slap',
	loadingTemplate: 'findingSlap'
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
