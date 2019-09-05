export const checkValidity = ( value, rules ) => {
    if ( !rules ) {
        return false;
    }

    if ( rules.minLength ) {
        return (value.length >= rules.minLength) ? [true, ''] : [ false, 'this field must be at least '+rules.minLength + ' chars'];
    }

    if ( rules.maxLength ) {
        return (value.length <= rules.maxLength) ? [true, ''] : [ false, ' this field cannot exceed ' + rules.maxLength + ' chars'];
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return (pattern.test( value )) ? [true, ''] : [false, 'this is not a valid email address'];
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        return (pattern.test( value )) ? [true, ''] : [false, 'this must be a number'];
    }

    if ( rules.required ) {
       return (value.trim() !== '') ? [true, ''] : [false, 'this field cannot be empty'];
    }

    return true;
}