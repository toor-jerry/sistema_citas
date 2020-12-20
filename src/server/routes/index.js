// express
const express = require('express');

// initialization express
const app = express();

// routes definitions
const appRoutes = require('./app');
const userRoutes = require('./user');
const dashboardRoutes = require('./dashboard');
const citedRoutes = require('./cite');
const areaRoutes = require('./area');

// Routes
app.use('/', appRoutes);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/cite', citedRoutes);
app.use('/area', areaRoutes);

// 404
app.use((req, res, next) => {
    res.status(404).render("404", {
        page: '404'
    })
})

module.exports = app;