const express = require('express'); // express

const { checkSession } = require('../middlewares/auth'); // midlewares auth

const { Cite } = require('../classes/cite'); // Cite class

// utils 
const { today } = require('../utils/utils');

// express initialization
const app = express();


// dashboard route
app.get('/', checkSession, async(req, res) => {
    res.render('dashboard', {
        page: 'Dashboard',
        cites: await Cite.findAllByAreaAndDate(req.session.user.area._id, today)
            .then(resp => resp.data)
            .catch(() => [])
    })
});


module.exports = app;