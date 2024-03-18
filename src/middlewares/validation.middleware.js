//import body to validate data from (express-validator)
import { body, validationResult } from "express-validator";

const addProductValidation = async (req, res, next) => {
    //validate data
    //  1. setUp the Rules
    const rules = [
        body('name').notEmpty().withMessage('Name is Required!'),
        body('price').isFloat({gt:0}).withMessage('Price should be a positive value!'),
        body('imageUrl').isURL().withMessage('Invalid Url'),
    ];

    //    2. Run those Rules
    await Promise.all(
        rules.map((rule) => rule.run(req))
    );


    //    3. check if there is any errors after running the rles
    var validationErrors = validationResult(req);


    //    4. if errors return the error message
    if(!validationErrors.isEmpty()){
        return res.render('new-product', {errorMessage: validationErrors.array()[0].msg,});
    }

    next();
}

export default addProductValidation;