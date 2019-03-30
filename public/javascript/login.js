var app = new Vue(
	{
	el: '#login',
	data:
		{
		username: '',
		password: '',
		error: '',
		},
	created()
		{
		},
	methods:
		{
		async LogIn()
			{
			try
				{
				let response = await axios.post("/api/users/login", { username: this.username, password: this.password });
				this.user = response.data;
				window.location.replace("/projectList.html");
				}
			catch (error)
				{
				this.error = "Error: " + error.response.data.message;
				}
			},
		}
	});		
