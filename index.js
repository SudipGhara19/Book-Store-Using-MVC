import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import addProductValidation from './src/middlewares/validation.middleware.js';


const server = express();

server.use(express.urlencoded({extended: true}));


//set  up view engine setup
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), 'src', 'views'));

server.use(ejsLayouts);


const productController = new ProductController();

server.get('/', productController.getProducts);
server.get('/add-product', productController.getAddForm);
server.post('/',addProductValidation, productController.addNewProduct);
server.get('/update-product/:id', productController.getUpdateProductView);
server.get('delete-product/:id', productController.deleteProduct)
server.post('/update-product', productController.postUpdateProduct);

server.use(express.static('src/views'));

server.listen(3400, () => {
    console.log('Server is up and running on Port: 3400');
})