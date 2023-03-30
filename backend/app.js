const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Requete reçue!');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'votre requete a bien ete reçue !' });
    next();
});

app.use((req, res, next) => {
    console.log('Reponse envoyé!');
    next();
});

module.exports = app;