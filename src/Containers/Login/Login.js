import React, { Component } from 'react'
import Heder from '../../Ui/Heder/Heder'
import classes from './Login.module.css'
import Button from '../../Ui/Button/Button'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as action from '../../store/actions/index'
import Spiner from '../../Ui/Spiner/Spiner'



let form

class Login extends Component {

    state = {
        spiner: false
    }


    state = {
        email: null,
        password: null,
    }

    componentDidMount() {
        if (this.state.isLogedin) {


        }


    }


    emailHandler = (e) => {
        let email = this.state.email
        email = e.target.value

        this.setState({
            email: email
        })
    }
    passwordHandler = (e) => {
        let password = this.state.email
        password = e.target.value

        this.setState({
            password: password
        })
    }


    submitHandler = (event) => {
        event.preventDefault()

        this.props.registrationStart()

        this.props.loginStart(this.state.email, this.state.password)



        if (form !== <Spiner /> && this.props.token) {
            this.props.history.push('/health-app/profile')
        }



    }





    render() {

        form = (
            <div className={classes.Container} >
                <form onSubmit={this.submitHandler} >
                    <label  >Email</label>
                    <input onChange={this.emailHandler} type="email" />
                    <label>Password</label>
                    <input onChange={this.passwordHandler} type="password" />
                    <Button />
                </form>

            </div>
        )
        if (this.props.loading) {

            form = <Spiner />
        }

        let errorMessage = null
        if (this.props.error && !this.props.idToken) {
            errorMessage = (
                <h1>{this.props.error}</h1>
            )
        }


        return (
            <div>
                <Heder token={this.props.token} />
                <div className={classes.Background} >

                    {errorMessage}
                    <div className={this.props.loading ? classes.Spiner : null}>


                        {form}


                    </div>
                </div>


                {this.props.token ? <Redirect to="./profile" /> : null}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogined: state.auth.isLogined,
        loading: state.auth.loading,
        token: state.auth.idToken,
        error: state.auth.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginStart: (email, password, isLogedin) => dispatch(action.login(email, password, isLogedin)),
        registrationStart: () => dispatch(action.registrationStart())

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);