var app = new Vue(
	{
	el: '#navigationBar',
	data:
		{
		barItems :
			[
			{text: 'Project List', url: '/projectList.html'},
			{text: 'Bug List', url: '/bugList.html'},
			{text: 'User Preferences', url: '/userPrefs.html'},
			{text: 'Admin', url: '/'},
			],
		},
	created()
		{
		
		},
	methods:
		{
		}
	});		
