const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const SALT_WORK_FACTOR = 10;

// Users
const userSchema = new mongoose.Schema(
	{
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	alias: String,
	address: String,
	secondaryEmail: String,
	permissions: [],
	tokens: [],
	});

