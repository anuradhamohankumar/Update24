const express = require('express');
const app = express();
const db = require('./db');



const UserController = require('./user/UserController');
app.use('/users', UserController);

const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

const NewsController = require('./news/NewsController');
app.use('/news', NewsController);

module.exports = app;