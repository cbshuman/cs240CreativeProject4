var app = new Vue(
	{
	el: '#adminUser',
	data:
		{
		newUsername: '',
		newPassword: '',
		newFirst: '',
		newLast: '',
		newMessage: '',
		},
	created()
		{
		
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
			}
		}
	});		
