import * as actionTypes from './actions/actions';
import saveToLocalStorage from './../IO/localstorage/localstorage';

const initialState = {
    userData: {},
    dataSaved: false,
    disabled: false,
    userForm: {
        fname: {
            elType: 'input',
            elConfig: {
                type: 'text',
                placeholder: 'First Name'
            },
            value: '',
            error: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        lname: {
            elType: 'input',
            elConfig: {
                type: 'text',
                placeholder: 'Last Name'
            },
            value: '',
            error: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        address: {
            elType: 'input',
            elConfig: {
                type: 'text',
                placeholder: 'Address',
                minLength: 5
            },
            value: '',
            error: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 10
            },
            valid: false,
            touched: false
        },
        email: {
            elType: 'input',
            elConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            error: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        }
    }
}

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVEUSERDATA:
            
            return updateObject(state, {
                userdata: action.details, 
                dataSaved: saveToLocalStorage(action.details)
            });
        default:
            return state;
    }
};

export default reducer;