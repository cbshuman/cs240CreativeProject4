const express = require('express');
const bodyParser = require("body-parser");

const multer = require('multer')
const upload = multer(
	{
	dest: './public/images/',
	limits:
		{
    	fileSize: 10000000
  		}
	});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

const mongoose = require('mongoose');


app.listen(3000, () => console.log('Server listening on port 3000!'));
