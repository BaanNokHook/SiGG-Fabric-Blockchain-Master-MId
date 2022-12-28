
class ValidateProvider {
    
    constructor() {

    }

    Compare(obj, rules, callback) {

        let validation = new Validator(obj, rules);
           
        callback(validation.fails(), { message: JSON.stringify(validation.errors.errors) });
    }
}

export default ValidateProvider;