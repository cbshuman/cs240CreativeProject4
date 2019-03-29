var app = new Vue(
	{
	el: '#bugList',
	data:
		{
		newbug: new bug(),
		createBugMenu: false,
		bugRowColor: true,
		error : '',
		bugs: [],
		projects: [],
		},
	created()
		{
		this.GetBugs();
		this.GetProjects();
		},
	methods:
		{
    	ToggleForm()
			{
      		this.error = "";	
			this.newbug	= new bug();
			this.newbug.project = this.projects[0].projectName;
			this.newbug.status = 'Low';
     		this.createBugMenu = !this.createBugMenu;
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
		async GetBugs()
			{
			try
				{
				let response = await axios.get("http://localhost:3000/api/bugs");
				this.bugs = response.data;
				return true;
				}
			catch (error)
				{
				console.log(error);
				}
			},
		async CreateBug()
			{
			if(this.CheckForValidBug() === true)
				{
				try
					{
					let response = await axios.post("http://localhost:3000/api/bugs",
						{
						bugNickname: this.newbug.bugNickname,
						emailReport: this.newbug.emailReport,
						priority: this.newbug.priority,
						project: this.newbug.project,
						ver1: this.newbug.ver1,
						ver2: this.newbug.ver2,
						ver3: this.newbug.ver3,
						ver4: this.newbug.ver4,
						bugDiscrip: this.newbug.bugDiscrip,
						});

					this.GetBugs();
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
				this.error = 'You need to enter in all required fields!';
				}
			},
		CheckForValidBug()
			{
			if(this.newbug.emailReport != '' && this.newbug.project != '' && this.newbug_bugDiscrip != '' && this.newbug.bugDiscrip != ''
				&& this.newbug.ver1 != '' && this.newbug.ver2 != '' && this.newbug.ver3 != '' && this.newbug.ver4 != '')
				{
				return(true);
				}
			else
				{
				return(false);
				}
			},
		GetTableRow()
			{
			this.bugRowColor = !this.bugRowColor;
			if(this.bugRowColor === true)
				{
				return("bugTableRowA");
				}
			else if(this.bugRowColor === false)
				{
				return("bugTableRowB");
				}
			},
		}
	});		
