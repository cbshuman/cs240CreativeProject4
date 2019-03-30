const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

//Project Schema
const bugSchema = new mongoose.Schema(
	{
	bugNickname: String,
	emailReport: String,
	emailPrimary: String,
	emailSecondary: String,
	emailQA: String,
	dateCreated: String,
	dateModified: String,
	status: String,
	priority : String,
	project: String,
	ver1: String,
	ver2: String,
	ver3: String,
	ver4: String,
	fixVer1: String,
	fixVer2: String,
	fixVer3: String,
	fixVer4: String,
	bugDiscrip: String,
	comments: [],
	});

// create a virtual paramter that turns the default _id field into id
bugSchema.virtual('id').get(function() { return this._id.toHexString(); });

// Ensure virtual fields are serialised when we turn this into a JSON object
bugSchema.set('toJSON', { virtuals: true });

const Bug = mongoose.model('Bugs', bugSchema);

router.get('/', auth.verifyToken, async (req, res) =>
	{
	try
		{
		let bugs = await Bug.find();
		return res.send(bugs);
		}
	catch (error)
		{
		console.log(error);
		return res.sendStatus(500);
		}
	});

router.get('/project/:projectName', auth.verifyToken, async (req, res) =>
	{
	try
		{
		let bug = await Bug.find({ project : req.params.projectName, });
		return res.send(bug);
		res.sendStatus(200);
		}
	catch (error)
		{
		console.log(error);
		res.sendStatus(500);
		}
	});

router.get('/:id', auth.verifyToken, async (req, res) =>
	{
	try
		{
		let bug = await Bug.findOne({ _id: req.params.id });
		return res.send(bug);
		res.sendStatus(200);
		}
	catch (error)
		{
		console.log(error);
		res.sendStatus(500);
		}
	});

router.put('/:id', auth.verifyToken, async (req, res) =>
	{
	//console.log("Looking for bug #" + req.params.id);
	try
		{
		let bug = await Bug.findOne({ _id: req.params.id	});
		//console.log("Request Description: " + req.body.description + "/" + req.body.title);

		bug.bugNickname = req.body.bugNickname,
		bug.emailReport = req.body.emailReport,
		bug.emailPrimary = req.body.emailPrimary;
		bug.emailSecondary = req.body.emailSecondary;
		bug.emailQA = req.body.emailQA;
		bug.dateModified = new Date(Date.now()).toLocaleString();
		bug.status = req.body.status;
		bug.priority = req.body.priority;
		bug.project = req.body.project;
		bug.ver1 = req.body.ver1;
		bug.ver2 = req.body.ver2;
		bug.ver3 = req.body.ver3;
		bug.ver4 = req.body.ver4;
		bug.fixVer1 = req.body.fixVer1;
		bug.fixVer2 = req.body.fixVer2;
		bug.fixVer3 = req.body.fixVer3;
		bug.fixVer4 = req.body.fixVer4;
		bug.bugDiscrip = req.body.bugDiscrip;

		bug.save();
		res.sendStatus(200);
		}
	catch (error)
		{
		console.log(error);
		res.sendStatus(500);
		}
	});

router.put('/comment/:id', auth.verifyToken, async (req, res) =>
	{
	//console.log("Looking for bug #" + req.params.id);
	try
		{
		let bug = await Bug.findOne({ _id: req.params.id	});
		
		if(!req.body.comment)
			{
			res.sendStatus(500);
			}

		let usersName = req.body.alias;

		if(usersName === '')
			{
			//console.log(req.body.first + "/" + req.body.last);
			if(req.body.first === req.body.last)
				{
				usersName = req.body.first;
				}
			else
				{
				usersName = req.body.first + " " + req.body.last;
				}
			}

		//console.log(req.body.first + "/" + req.body.last);

		if(usersName === '')
			{
			res.sendStatus(576);
			return;
			}

		let comment =  { comment: req.body.comment, usersName: usersName, date: new Date(Date.now()).toLocaleString() };
		bug.comments.push(comment);
		bug.save();
		res.sendStatus(200);
		}
	catch (error)
		{
		console.log(error);
		res.sendStatus(500);
		}
	});


router.post('/', auth.verifyToken, async (req, res) =>
	{
	//console.log("Version" + req.body.ver1 + "." + req.body.ver2);
	const bug = new Bug(
		{
		bugNickname: req.body.bugNickname,
		emailReport: req.body.emailReport,
		emailPrimary: '',
		emailSecondary: '',
		emailQA: '',
		dateCreated: new Date(Date.now()).toLocaleString(),
		dateModified: new Date(Date.now()).toLocaleString(),
		status: "New",
		priority: req.body.priority,
		project: req.body.project,
		ver1: req.body.ver1,
		ver2: req.body.ver2,
		ver3: req.body.ver3,
		ver4: req.body.ver4,
		fixVer1: req.body.fixVer1,
		fixVer2: req.body.fixVer2,
		fixVer3: req.body.fixVer3,
		fixVer4: req.body.fixVer4,
		bugDiscrip: req.body.bugDiscrip,
		});
	try
		{
		await bug.save();
		return res.send(bug);
		}
	catch (error)
		{
		console.log(error);
		return res.sendStatus(500);
		}
	});

module.exports = router;
