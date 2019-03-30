var app = new Vue(
	{
	el: '#userApp',
	data:
		{
		user : '',
		oldPassword: '',
		newPassword: '',
		newPasswordRepeat: '',
		errorA: '',
		errorB: '',
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
			try
				{
				let response = await axios.put("/api/users/update/" + this.user._id,
					{
					id : this.user._id,
					username : this.user.username,
					firstName : this.user.firstName,
					lastName : this.user.lastName,
					alias : this.user.alias,
					address : this.user.address,
					phone : this.user.phone,
					secondaryEmail : this.user.secondaryEmail,
					});
				this.GetUser();
				this.errorA = "Successfully updated your information!";
				}
			catch (error)
				{
				this.errorA = "Error: " + error.response.data.message;
				}
			},
    	async UpdatePassword()
			{
			try
				{
				let response = await axios.put("/api/users/update/password/"+ this.user._id,
					{
					id : this.user._id,
					oldPassword : this.oldPassword,
					newPassword : this.newPassword,
					newPasswordRepeat : this.newPasswordRepeat,
					});
				this.GetUser();
				this.errorB = "Password Successfully updated!";
				}
			catch (error)
				{
				this.errorB = "Error: " + error.response.data.message;
				}
			},
		}
	});		
