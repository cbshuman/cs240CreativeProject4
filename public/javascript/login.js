var app = new Vue(
	{
	el: '#login',
	data:
		{
		username: '',
		password: '',
		},
	created()
		{
		},
	methods:
		{
		async logIn()
			{
			try
				{
				//let response = await axios.get("/api/items");
				//this.items = response.data;
				return true;
				}
			catch (error)
				{
				console.log(error);
				}
			},
		}
	});		
