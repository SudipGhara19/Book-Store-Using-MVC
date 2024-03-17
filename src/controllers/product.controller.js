import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController{
    getProducts(req, res){

        const products = ProductModel.get();
        console.log(products);
        return res.sendFile(
            path.join(path.resolve(),'src','views','products.html'),
            )
    }
}