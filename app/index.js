'use strict';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import appInfo from '../package.json';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes')(app);

const port = config.server.port;
const server = app.listen(port, function (error) {
	if (error) throw error;
	let port = server.address().port;
	let host = server.address().address;
	host = host === '::' ? 'localhost' : host;
	console.info('%s listening at: \nhttp://%s:%s', appInfo.name, host, port);
});


