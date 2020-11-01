import React, { Component } from 'react'
import classes from './Profile.module.css'
import Heder from '../../Ui/Heder/Heder'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Profile extends Component {

    logOut = () => {

        this.props.logout()
    }



    render() {
        const data = JSON.parse(localStorage.getItem('userInfo'))


        return (
            <div  >


                <Heder logout={this.logOut} token={this.props.token} />

                <div className={classes.Container} >

                    <div className={classes.ViewerBack}>
                        <div className={classes.MobileAlign} >
                            <h3>UserName: {data.name}</h3>
                            <p> Desired Weight: {data.weight} kg </p>
                            <p> Desired Meal Calories per day: {data.meal} cl </p>
                            <p> Desired Activity Calories per day: {data.activity} cl </p>
                            <div className={classes.Flexarea} >
                                <div className={classes.FlexBox}>
                                    <NavLink className={classes.Active} to="/health-app/weight" > <h2>Weight</h2></NavLink>
                                    <NavLink className={classes.Active} to='/health-app/activity'  ><h2>Activity</h2></NavLink>
                                    <NavLink className={classes.Active} to='/health-app/meal'>  <h2>Meal</h2></NavLink>


                                </div>
                                <div className={classes.Dashboard}>
                                    <NavLink to='/health-app/profile/dashboard'  >  <h1>Dashboard</h1></NavLink>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>


            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile);