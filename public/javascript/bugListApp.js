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
		bugList: [],
		bugSort: 'ID',
		projects: [],
		},
	created()
		{
		this.GetBugs();
		this.GetProjects();
		},
	methods:
		{
		ChangeSortMethod(method)
			{
			this.bugSort = method;
			this.SortBugs();
			},
		SortBugs()
			{
			switch(this.bugSort)
				{
				case ('ID'):
					this.bugList = (this.bugs.sort(function(a, b)
						{
						var x = a._id.toLowerCase();
						var y = b._id.toLowerCase();
						if (x < y){return -1;}
						if (x > y){return 1;}
						return 0;
						}));
				break;
				case ('NICKNAME'):
					this.bugList = (this.bugs.sort(function(a, b)
						{
						var x = a.bugNickname.toLowerCase();
						var y = b.bugNickname.toLowerCase();
						if (x < y){return -1;}
						if (x > y){return 1;}
						return 0;
						}));
				break;
				case ('PROJECT'):
					this.bugList = (this.bugs.sort(function(a, b)
						{
						var x = a.project.toLowerCase();
						var y = b.project.toLowerCase();
						if (x < y){return -1;}
						if (x > y){return 1;}
						return 0;
						}));
				break;
				case ('VER'):
					this.bugList = (this.bugs.sort(function(a, b)
						{
						var x = a.ver1 + a.ver2 + a.ver3 + a.ver4;
						var y = b.ver1 + b.ver2 + b.ver3 + b.ver4;
						if (x > y){return -1;}
						if (x < y){return 1;}
						return 0;
						}));
				break;
				case ('STATUS'):
					this.bugList = (this.bugs.sort(function(a, b)
						{
						var x = a.status;
						var y = b.status;

						if(x === y) {return (0)}

						if(x === "New") {return -1;}
						else if(y === "New")  {return 1;}

						if(x === "On Hold") {return -1;}
						else if(y === "On Hold")  {return 1;}

						if(x === "Fix in Progress") {return -1;}
						else if(y === "Fix in Progress")  {return 1;}

						if(x === "Fixed") {return -1;}
						else if(y === "Fixed")  {return 1;}

						return 0;
						}));
				break;
				case ('PRIORITY'):
					this.bugList = (this.bugs.sort(function(a, b)
						{
						var x = a.priority;
						var y = b.priority;

						if(x === y) {return (0)}

						if(x === "Imediate") {return -1;}
						else if(y === "Imediate")  {return 1;}

						if(x === "High") {return -1;}
						else if(y === "High")  {return 1;}

						if(x === "Medium") {return -1;}
						else if(y === "Medium")  {return 1;}

						if(x === "Low") {return -1;}
						else if(y === "Low")  {return 1;}

						return 0;
						}));
				break;
				case ('DISCRIPT'):
					this.bugList = (this.bugs.sort(function(a, b)
						{
						var x = a.bugDiscrip.toLowerCase();
						var y = b.bugDiscrip.toLowerCase();
						if (x < y){return -1;}
						if (x > y){return 1;}
						return 0;
						}));
				break;
				default:
					this.bugList = bugs;
				break;				
				}
			},
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
				this.SortBugs();
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
