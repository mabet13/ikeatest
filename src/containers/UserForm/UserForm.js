import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './UserData.css';
import Input from '../../components/UI/Input/Input';
import { checkValidity } from '../../shared/utility';
import * as actionTypes from '../../store/actions/actions';


const updateEl = (oldEl, updatedProps) => {
    return {
        ...oldEl,
        ...updatedProps
    };
};

class ContactData extends Component {
    state = {
        disabled: false,
        formIsValid: false,
        userForm: {}
    }

    componentDidMount () {
        const temp = {...this.props.userForm};
        this.setState({userForm: temp});
    }

    detailsHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.userForm) {
            formData[formElementIdentifier] = this.state.userForm[formElementIdentifier].value;
        };
        this.props.saveUserData(formData);
        this.setState({disabled : true});
    }

    blurChangedHandler = (event, elId) => {
        console.log("blur");  // not working?
    }

    inputChangedHandler = (event, elId) => {
        const updatedFormEl = updateEl(this.state.userForm[elId], {
            value:   event.target.value,
            valid:   checkValidity(event.target.value, this.state.userForm[elId].validation),
            touched: true
        });
        
        const updatedUserForm = updateEl(this.state.userForm, {
            [elId]: updatedFormEl
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedUserForm) {
            formIsValid = updatedUserForm[inputIdentifier].valid[0] && formIsValid;
        }
        this.setState({userForm: updatedUserForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.userForm) {
            formElementsArray.push({
                id: key,
                config: this.state.userForm[key]
            });
        }

        let form = (
            <fieldset disabled={this.state.disabled }>
            <form onSubmit={this.detailsHandler}>
                {formElementsArray.map(formElement => (
                    <div key={formElement.id}>
                        <label>{formElement.config.elConfig.placeholder}</label>
                        <Input 
                            elType={formElement.config.elType}
                            elConfig={formElement.config.elConfig}
                            value={formElement.config.value}
                            invalid={formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            blur={(event) => this.blurChangedHandler(event, formElement.id) }
                            changed={(event) => this.inputChangedHandler(event, formElement.id) }
                        />
                        { formElement.config.valid }
                    </div>
                ))}
                <br />
                { this.props.dataSaved ? 
                    'Your data has been saved' : 
                    <button className="button" disabled={!this.state.formIsValid}>
                        Submit
                    </button>
                }
                
            </form>
            </fieldset>
        );
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                { form }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataSaved: state.dataSaved,
        userForm: state.userForm,
        disabled: state.disabled
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveUserData: (userData) => dispatch({type: actionTypes.SAVEUSERDATA, details: userData})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
