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
        //validate data
        const { name, price, imageUrl } = req.body;
        let errors = [];

        if(!name || name.trim() == ''){
            errors.push('Name is required!')
        }

        if(!price || parseFloat(price)<1){
            errors.push('Price must be a positive Number.')
        }

        try{
            const validURL = new URL(imageUrl);
        }catch(err){
            errors.push("URL is invalid.");
        }

        if(errors.length > 0){
            return res.render('new-product', {errorMessage: errors[0]});
        }

        console.log('New book added. Book Details: ' + req.body);
        ProductModel.add(req.body);
        const products = ProductModel.get();
        res.render('products', {products: products})
    } 
}