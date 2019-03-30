var app = new Vue(
	{
	el: '#adminUser',
	data:
		{
		user: '',
		newUsername: '',
		newPassword: '',
		newFirst: '',
		newLast: '',
		newMessage: '',
		deleteUsername: '',
		deletePassword: '',
		deletePasswordrept: '',
		},
	created()
		{
		this.GetUser();
		},
	methods:
		{
    	async CreateNewUser()
			{
			try
				{
				console.log("Trying to create a user. . .");
				await axios.post("/api/users",
					{
					username: this.newUsername,
					firstName: this.newFirst,
					lastName: this.newLast,
					password: this.newPassword,
					});
				this.newUsername = '';
				this.newPassword = '';
				this.newFirst = '';
				this.newLast = '';
				}
			catch(error)
				{
				this.newMessage = error;
				console.log(error);
				}
			},
		async GetUser()
			{
			try
				{
				let response = await axios.get("/api/users");
				this.user = response.data;
				}
			catch (error)
				{
				window.location.replace("/");
				}
			},
    	async DeleteUser()
			{
			try
				{
				console.log("Trying to remove a user using: " + this.user._id);
				await axios.delete("/api/users/" + this.user._id + "/" + this.deletePassword + "/" + this.deletePasswordrept  + "/" + this.deleteUsername);

				this.user._id = '';
				this.deletePassword = '';
				this.deletePasswordrept = '';
				this.deleteUsername = '';
				}
			catch(error)
				{
				this.newMessage = error;
				console.log(error);
				}
			},
		}
	});		
