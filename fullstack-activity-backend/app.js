const express = require('express');
const mongoose = require("mongoose");
const product = require('./models/product');
const app = express();
const Product = require("./models/product");


mongoose.connect('mongodb+srv://root:toor@cluster0.sectcuz.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
// //Express prend toutes les requêtes qui ont comme Content-Type  application/json  
// et met à disposition leur  body  directement sur l'objet req, 
// ce qui nous permet d'écrire le middleware POST
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Middleware GET

// app.get('/api/stuff', (req, res, next) => {
//     const stuff = [{
//             _id: 'oeihfzeoi',
//             title: 'Mon premier objet',
//             description: 'Les infos de mon premier objet',
//             imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//             price: 4900,
//             userId: 'qsomihvqios',
//         },
//         {
//             _id: 'oeihfzeomoihi',
//             title: 'Mon deuxième objet',
//             description: 'Les infos de mon deuxième objet',
//             imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//             price: 2900,
//             userId: 'qsomihvqios',
//         },
//     ];
//     res.status(200).json(stuff);
// });

//Middleware utilisation mongoose
app.get('/api/products', (req, res, next) => {
    Product.find()
        .then(prod => res.status(200).json({ products: prod }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then(product => {
            // delete prod.__v;
            // const product = new Product({
            //     ...prod
            // });
            // console.log(product);
            return res.status(200).json({ product })
        })
        .catch(error => res.status(404).json({ error }));
});

//Utilisisation de monogoose et remplacant la method post
app.post('/api/products', (req, res, next) => {
    delete req.body._id;
    const product = new Product({
        ...req.body
    });
    product.save()
        .then((product) => res.status(201).json({ product }))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Modified!' }))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Deleted!' }))
        .catch(error => res.status(400).json({ error }));
});

// // Middleware POST
// app.post('/api/stuff', (req, res, next) => {
//     console.log(req.body);
//     res.status(201).json({
//         message: 'Objet créé !'
//     });
// });

//Middleware example
// app.use((req, res, next) => {
//     console.log('Requete reçue!');
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });

// app.use((req, res, next) => {
//     res.json({ message: 'votre requete a bien ete reçue !' });
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Reponse envoyé!');
//     next();
// });


module.exports = app;