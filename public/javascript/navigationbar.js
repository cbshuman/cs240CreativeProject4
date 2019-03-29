var app = new Vue(
	{
	el: '#navigationBar',
	data:
		{
		user : '',
		barItems :
			[
			{text: 'Project List', url: '/projectList.html'},
			{text: 'Bug List', url: '/bugList.html'},
			{text: 'User Preferences: ', url: '/userPrefs.html'},
			{text: 'Admin', url: '/admin.html'},
			],
		},
	created()
		{
		this.GetUser();
		},
	methods:
		{
		async LogOut()
			{
			try
				{
				let response = await axios.delete("/api/users");
				window.location.replace("/");
				}
			catch (error)
				{
				// don't worry about it
				}
			},
		async GetUser()
			{
			try
				{
				let response = await axios.get("/api/users");
				this.user = response.data;
				this.barItems[2].text += this.user.firstName;
				}
			catch (error)
				{
				window.location.replace("/");
				}
			},
		}
	});		
