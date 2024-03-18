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

        return res.render('new-product');
    }

    addNewProduct(req, res){
        console.log('New book added. Book Details: ' + req.body);
        ProductModel.add(req.body);
        const products = ProductModel.get();
        res.render('products', {products: products})
    }
}