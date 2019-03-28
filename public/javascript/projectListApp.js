var app = new Vue(
	{
	el: '#projectList',
	data:
		{
		createProjectMenu: false,
		error : '',
		newProjectname: '',
		newProjectDisc: '',
		projects: [],
		},
	created()
		{
		this.GetProjects();
		},
	methods:
		{
    	ToggleForm()
			{
      		this.error = "";	
			this.newProjectname = "";
			this.newProjectDisc = "";
     		this.createProjectMenu = !this.createProjectMenu;
    		},
		async GetProjects()
			{
			try
				{
				let response = await axios.get("http://localhost:3000/api/projects");
				this.projects = response.data;
				return true;
				}
			catch (error)
				{
				console.log(error);
				}
			},
		async CreateProject()
			{
			try
				{
				let response = await axios.post("http://localhost:3000/api/projects", { projectName: this.newProjectname, projectDisc: this.newProjectDisc});
				this.GetProjects();
				this.ToggleForm();
				return true;
				}
			catch (error)
				{
				console.log(error);
				}
			},
		}
	});		
