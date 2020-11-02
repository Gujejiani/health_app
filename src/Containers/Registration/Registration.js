import React, { Component } from 'react';
import Heder from "../../Ui/Heder/Heder";
import classes from './Registration.module.css'
import Button from '../../Ui/Button/Button'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Input from '../../Components/Input/Input'
import Spiner from '../../Ui/Spiner/Spiner'
import { Redirect } from 'react-router-dom'



let userInfo = {
    name: null,
    email: null,
    password: null,
    weight: null,
    meal: null,
    activity: null,
    token: null,

}


class Registration extends Component {
    state = {
        formControls: {
            name: {
                type: 'text',
                required: true,
                label: 'Name',
                placeholder: 'enter Name',
                value: '',
                touched: false,
                valid: false,
                validation: {
                    minLength: 1,
                    maxLength: 16,
                },

            },


            email: {
                type: 'email',
                required: true,
                label: 'Email',
                placeholder: 'enter Email',
                value: '',
                touched: false,
                valid: false,
                validation: {
                    maxLength: 30,
                    minLength: 6,
                },


            },
            password: {
                type: 'password',
                required: true,
                label: 'Password',
                value: '',
                touched: false,
                valid: false,
                validation: {


                    maxLength: 30,
                    minLength: 6,
                }

            },
            weight: {
                type: 'number',
                required: true,
                label: 'Desired Weight',
                placeholder: 'enter Weight',
                value: '',
                touched: false,
                valid: false,
                validation: {

                    maxLength: 3,
                    minLength: 1,
                },

            },
            meal: {
                type: 'number',
                required: true,
                label: 'Desired meal Calories per day',
                placeholder: 'enter activity calories',
                value: '',
                touched: false,
                valid: false,
                validation: {

                    maxLength: 5,
                    minLength: 1,
                },

            },
            activity: {
                type: 'number',
                required: true,
                label: 'Desired activity Calories per day',
                placeholder: 'enter meal calories',
                value: '',
                touched: false,
                valid: false,
                validation: {


                    maxLength: 5,
                    minLength: 1,
                }

            }

        },
        formIsValid: false,
        loading: true,
        isLogined: false,

    }




    formInputHandler = (event, formIdentifer) => {  //cloning state and than changeing it  umutable way
        userInfo[formIdentifer] = event.target.value
        userInfo.token = this.props.token
        const updatedForm = {
            ...this.state.formControls
        }
        const updatedFormElement = {
            ...updatedForm[formIdentifer]
        }



        updatedFormElement.value = event.target.value

        updatedFormElement.touched = true

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[formIdentifer] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;

        }


        this.setState({ formControls: updatedForm, formIsValid: formIsValid })


    }

    submitHandler = (event) => {    //takeing form submiting values to the reducer state
        event.preventDefault()

        this.props.onRegistrationStart()



        this.props.onSubmit(userInfo); // giving data tu reducer

        this.props.userRegistered(this.state.formControls.email.value, this.state.formControls.password.value, this.state.isLogined, userInfo);

        this.setState((prewState) => ({
            isLogined: !prewState.isLogined
        }))

    }


    checkValidity(value, rules) { //checking form validations
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.email) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.password) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    render() {


        const formElementArray = []

        for (let inputValues in this.state.formControls) {

            formElementArray.push({
                id: inputValues,
                config: this.state.formControls[inputValues]

            });

        }
        let form = (
            <form onSubmit={this.submitHandler} >
                {formElementArray.map(values => (

                    <Input style={values.config.valid ? classes.InputValid : classes.InputNotValid} change={(e) => this.formInputHandler(e, values.id)} key={values.id}
                        required={values.config.required}
                        placeholder={values.config.placeholder}
                        label={values.config.label}
                        type={values.config.type} />

                ))}
                <Button disabled={!this.state.formIsValid} />
            </form>

        )

        if (this.props.loading) {
            form = <Spiner />
        }

        let errorMessage = null
        if (this.props.error && !this.props.idToken) {
            errorMessage = this.props.error

        }

        if (this.props.error === "EMAIL_EXISTS") {
            errorMessage = "Sorry this Email is already Exists, please Sign In"

        }
        if (this.props.token) {
            errorMessage = <span className={classes.Succes}> {"Registration complited, Please Login"}</span>
        }


        return (
            <div>
                <Heder />
                <section className={classes.Section} >
                    <h1>Please Regiser to join</h1>
                    <p className={classes.ErorMessage}>{errorMessage} </p>
                    <div className={classes.Container}  >

                        {form}


                    </div>


                </section>



            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.reducer.userInfo,
        loading: state.auth.loading,
        token: state.auth.idToken,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (userInfo) => dispatch(actions.formSubmited(userInfo)),
        onRegistrationStart: (loading) => dispatch(actions.registrationStart(loading)),

        userRegistered: (email, password, isLogined, userInfo) => dispatch(actions.auth(email, password, isLogined, userInfo))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Registration)

