var app = new Vue(
	{
	el: '#userApp',
	data:
		{
		user : '',
		},
	created()
		{
		this.GetUser();
		},
	methods:
		{
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
    	async UpdateUser()
			{
			let response = await axios.put("/api/users/update/" + this.bugID ,
				{
				username : this.user.username,
				firstName : this.user.firstName,
				lastName : this.user.lastName,
				alias : this.user.alias,
				address : this.user.address,
				phone : this.user.phone,
				secondaryEmail : this.user.secondaryEmail,
				});
			this.GetUser()
			},
		}
	});		
