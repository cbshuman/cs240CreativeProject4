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
				let response = await axios.get("/api/projects");
				let projectData = response.data;

				for(let i = 0; i < projectData.length; i++)
					{
					let element = projectData[i];
					let bugs = await axios.get("/api/bugs/project/" + element.projectName);
					element.bugs = bugs.data;
					projectData[i] = element;
					}

				this.projects = projectData;
				return true;
				}
			catch (error)
				{
				console.log(error);
				}
			},
		async CreateProject()
			{
			if(this.newProjectname != '' && this.newProjectDisc != '')
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
				}
			else
				{
				this.error = 'You need to enter a name and discription to create a new project!';
				}
			},
		}
	});		
