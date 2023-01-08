import path from 'path';
import express from 'express';
import preview from './preview';
import controls from './controls';
import send from './send';

export default {
	id: 'newsletter',
	handler: (router, context) => {
		router.use('/assets', express.static(path.resolve(__dirname, 'assets')));
		router.get('/controls/:id', controls(context));
		router.get('/preview/:id', preview(context));
		router.get('/send/:id', send(context));
	},
};

