import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController{
    getProducts(req, res){

        const products = ProductModel.get();

        res.render("products", {products:products});
        // console.log(products);
        // return res.sendFile(
        //     path.join(path.resolve(),'src','views','products.html'),
        //     )
    }


    getAddForm(req, res) {

        return res.render('new-product', {errorMessage: null});
    }

    addNewProduct(req, res){
        const {name, desc, price} = req.body;
        const imageUrl = 'images/' + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl);
        var products = ProductModel.get();
        res.render('products', {products: products})
    } 


    getUpdateProductView(req, res, next){
        //  1.if product exist then return view
        const id = req.params.id;
        const productFound = ProductModel.getById(id);

        if(productFound){
            res.render('update-product', {product:productFound, errorMessage:null});
        }
        //  2. else retuen errors
        else{
            res.status(401).send('Product not found!');
        }
    }


    postUpdateProduct(req, res){
        ProductModel.update(req.body);
        var products = ProductModel.get();
        res.render('products', {products: products})
    }

    deleteProduct(req, res){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);

        if(!productFound){
            return res.status(401).send('Product not found!');
        }
        else{
            ProductModel.delete(id);
            var products = ProductModel.get();
            res.render('products', {products})
        }
    }
}