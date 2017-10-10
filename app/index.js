'use strict';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import appInfo from '../package.json';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

process.env.NODE_ENV === 'development' ?
	require('./webpack')(app) : null;

require('./routes/static')(app, express);
require('./routes')(app);

const port = config.port;
const server = app.listen(port, function (error) {
	if (error) throw error;
	let port = server.address().port;
	let host = server.address().address;
	host = host === '::' ? 'localhost' : host;
	console.info('%s listening at: \nhttp://%s:%s', appInfo.name, host, port);
});


