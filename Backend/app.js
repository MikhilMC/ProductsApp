const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ProductDb',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to MongoDB.");
        }
    }
);

const ProductData = require('./src/models/ProductData');
const UserData = require('./src/models/UserData')

const app = new express();
app.use(cors());
app.use(bodyParser.json());

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === "null") {
        res.status(401).send("Unauthorized request");
    }
    try {
        let payload = jwt.verify(token, "secretKey");
        req.userId = payload.subject;
        next();
    } catch (err) {
        res.status(401).send("Unauthorized request");
    }
}

app.post("/signup", (req, res) => {
    let userData = req.body;
    let user = new UserData(userData);
    user.save((err, signupUserDetails) => {
        if (err) {
            console.log(err);
        } else {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, "secretKey");
            res.status(200).send({token});
            console.log(signupUserDetails);
        }
    });
});

app.post("/login", (req, res) => {
    let userData = req.body;
    UserData.findOne({email: userData.email}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send("Invalid Email");
            } else if (user.password !== userData.password) {
                res.status(401).send("Invalid Password");
            } else {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, "secretKey");
                res.status(200).send({token});
                console.log(user);
            }
        }
    });
});

app.get('/products', verifyToken, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    ProductData.find()
                .then(function(products){
                    res.status(200).send(products);
                });
});

app.post('/insert', verifyToken, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    var product = {
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl
    }
    var newProduct = new ProductData(product);
    newProduct.save();
    res.status(200).send(newProduct);
});

app.get("/product/:id", verifyToken, (req, res) => {
    let id = req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    ProductData.findById(id, (err, product) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(product);
        }
    });
});

app.post("/product/:id", verifyToken, (req, res) => {
    let id = req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    let editedProduct = {}
    if (req.body.editedProduct.productId !== null) editedProduct.productId = req.body.editedProduct.productId;
    if (req.body.editedProduct.productName !== null) editedProduct.productName = req.body.editedProduct.productName;
    if (req.body.editedProduct.productCode !== null) editedProduct.productCode = req.body.editedProduct.productCode;
    if (req.body.editedProduct.releaseDate !== null) editedProduct.releaseDate = req.body.editedProduct.releaseDate;
    if (req.body.editedProduct.description !== null) editedProduct.description = req.body.editedProduct.description;
    if (req.body.editedProduct.price !== null) editedProduct.price = req.body.editedProduct.price;
    if (req.body.editedProduct.starRating !== null) editedProduct.starRating = req.body.editedProduct.starRating;
    if (req.body.editedProduct.imageUrl !== null) editedProduct.imageUrl = req.body.editedProduct.imageUrl
    ProductData.findByIdAndUpdate(id, editedProduct, (err, product) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(product);
        }
    });
});

app.delete("/delete/:id", verifyToken, (req, res) => {
    let id = req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    ProductData.findByIdAndDelete(id, (err, product) => {
        if (err) {
            console.log(err);
        } else {
            console.log(product);
            res.status(200).send(product);
        }
    });
});

app.get("/test", verifyToken, (req, res) => {
    res.status(200);
});

app.listen(3000, () => {
    console.log("Server running at port 3000");
})