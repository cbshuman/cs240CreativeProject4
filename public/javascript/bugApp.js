var app = new Vue(
	{
	el: '#bugApp',
	data:
		{
		newComment: '',
		bugID : '',
		projects: [],
		bug: new bug(),
		user: '',
		},
	created()
		{
		this.GetBugID();
		this.GetProjects();
		this.GetBug();
		this.GetUser();
		},
	methods:
		{
		GetBugID()
			{
			let url = window.location.href;

			this.bugID = url.slice(url.indexOf('#')+1,url.length);
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
		async UpdateBug()
			{
			let response = await axios.put("/api/bugs/" + this.bugID,
				{
				bugNickname: this.bug.bugNickname,
				emailReport: this.bug.emailReport,
				emailPrimary: this.bug.emailPrimary,
				emailSecondary: this.bug.emailSecondary,
				emailQA: this.bug.emailQA,
				status: this.bug.status,
				priority : this.bug.priority,
				project: this.bug.project,
				ver1: this.bug.ver1,
				ver2: this.bug.ver2,
				ver3: this.bug.ver3,
				ver4: this.bug.ver4,
				bugDiscrip: this.bug.discription,
				});
			},
		async SendComment()
			{
			let response = await axios.put("/api/bugs/comment/" + this.bugID ,
				{
				comment: this.newComment,
				first: this.user.firstName,
				last: this.user.lastName,
				alias: this.user.alias
				});
			this.newComment = '';
			this.GetBug();
			},
		async GetBug()
			{
			try
				{
				let response = await axios.get("/api/bugs/" + this.bugID ,{ id: this.bugID, });
				let responseData = response.data;		

				this.bug.bugNumber = responseData._id;		
				this.bug.bugNickname = responseData.bugNickname;
				this.bug.emailReport = responseData.emailReport;
				this.bug.emailPrimary = responseData.emailPrimary;
				this.bug.emailSecondary = responseData.emailSecondary;
				this.bug.emailQA = responseData.emailQA;
				this.bug.created = responseData.dateCreated;
				this.bug.modified = responseData.dateModified;
				this.bug.status = responseData.status;
				this.bug.priority = responseData.priority;
				this.bug.project = responseData.project;
				this.bug.ver1 = responseData.ver1;
				this.bug.ver2 = responseData.ver2;
				this.bug.ver3 = responseData.ver3;
				this.bug.ver4 = responseData.ver4;
				this.bug.discription = responseData.bugDiscrip;
				this.bug.comments = responseData.comments;
				return true;
				}
			catch (error)
				{
				console.log(error);
				}
			},
		}
	});		
