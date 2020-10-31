import React, { Component } from 'react'
import classes from './Dashboard.module.css'
import { connect } from 'react-redux'
import Heder from '../../Ui/Heder/Heder'
import * as actions from '../../store/actions/index'
//import DataPicker from '../../Components/DatePicker/DatePicker'
//import Button from '../../Ui/Button/Button'
import Table from '../../Components/Table/Table'


let table = null


const totalActCalories = JSON.parse(localStorage.getItem('ACTIVITY')) //geting data from local storage
const totalMeal = JSON.parse(localStorage.getItem('totalMeal')) //geting data from local storage
const currentWeight = JSON.parse(localStorage.getItem('currentWeight'))


class Dashboard extends Component {



    state = {

        inputArray: [],
    }


    logOut = () => {
        this.props.logout()

    }


    componentDidMount() {

        let weight = Array.from(currentWeight)
        setTimeout(() => {
            console.log(this.state.inputArray)
        }, 2000)




        let inputArray = []

        totalActCalories.map(key => (
            weight.push({
                id: key.id,
                activity: key.totalCalories,
                date: key.date,


            })

        ))

        totalMeal.map(key => (
            weight.push({
                meal: key.meal,
                date: key.date
            })

        ))

        currentWeight.map(key => (
            inputArray.push({
                weight: key.weight
            })
        ))

        console.log(weight)
        currentWeight.map(key => (
            inputArray.push(
                {
                    date: key.date
                })
        ))

        let inputedData = []

        weight.map(x => {
            inputedData.push({
                date: x.date,
                weight: x.weight,
                meal: x.meal,
                activity: x.activity
            })
        })
        console.log(inputedData)

        this.setState({
            inputArray: inputedData
        })

    }




    render() {
        table = (
            <div>
                {this.state.inputArray.map(key => (


                    <Table date={key.date} cancel={classes.Cancel} type={key.weight} distance={key.meal ? key.meal : 0} key={1 + 1} cl={key.activity ? key.activity : 0} val={'cl'} click={() => this.deleteHandler(key.id, key.calories)} />



                ))}
            </div>

        )


        return (

            <div>
                <Heder logout={this.logOut} token={this.props.token} />
                <div className={classes.Background}>
                    <div onClick={this.findOutHandler} className={classes.Show}>
                        <div className={classes.Spans} >
                            <span>Date </span> <span>Weight</span><span> Meals</span> <span>Activities</span>
                        </div>
                        {table}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
