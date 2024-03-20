import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import {addProductValidation, addUserValidation} from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';


const server = express();
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
    })
);

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

server.get('/',auth, productController.getProducts);
server.get('/add-product',auth, productController.getAddForm);
server.get('/update-product/:id',auth, productController.getUpdateProductView);
server.get('/register', userController.getRegister);
server.get('/login', userController.getLogin);
server.get('/logout', userController.logout);

server.post('/',auth, uploadFile.single('imageUrl'),addProductValidation, productController.addNewProduct);
server.post('/delete-product/:id',auth, productController.deleteProduct);
server.post('/update-product',auth, productController.postUpdateProduct);
server.post('/register',addUserValidation, userController.postRegister);
server.post('/login', userController.postLogin);




server.listen(3400, () => {
    console.log('Server is up and running on Port: 3400');
})