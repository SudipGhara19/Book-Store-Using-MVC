import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import addProductValidation from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';


const server = express();

server.use(express.static('public'));
server.use(express.static('src/views'));
server.use(express.json());

server.use(express.urlencoded({extended: true}));


//set  up view engine setup
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), 'src', 'views'));

server.use(ejsLayouts);


const productController = new ProductController();
const userController = new UserController();

server.get('/', productController.getProducts);
server.get('/add-product', productController.getAddForm);
server.get('/update-product/:id', productController.getUpdateProductView);
server.get('/register', userController.getRegister);
server.post('/',uploadFile.single('imageUrl'),addProductValidation, productController.addNewProduct);
server.post('/delete-product/:id', productController.deleteProduct);
server.post('/update-product', productController.postUpdateProduct);




server.listen(3400, () => {
    console.log('Server is up and running on Port: 3400');
})