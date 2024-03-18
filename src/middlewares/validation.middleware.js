const addProductValidation = (req, res, next) => {
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

    next();
}

export default addProductValidation;