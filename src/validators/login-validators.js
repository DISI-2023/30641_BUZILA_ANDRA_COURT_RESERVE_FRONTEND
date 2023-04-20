function LoginValidators(fieldValue, validationRules) {

    function emailValidation(fieldValue){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(fieldValue).toLowerCase());
    }

    function isRequired(fieldValue){
        return fieldValue.trim() !== '';
    }

    function minLength(fieldValue){
        return fieldValue.length >= 8;
    }

    let fieldIsValid = true;

    for(let rule in validationRules){
        switch (rule) {
            case 'emailValidation': fieldIsValid = fieldIsValid && emailValidation(fieldValue);
                break;

            case 'isRequired': fieldIsValid = fieldIsValid && isRequired(fieldValue);
                break;

            case 'minLength': fieldIsValid = fieldIsValid && minLength(fieldValue);
                break;

            default: fieldIsValid = true;
        }
    }

    return fieldIsValid;

}
export default LoginValidators;