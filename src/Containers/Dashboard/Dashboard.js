import React, { Component } from 'react'
import classes from './Dashboard.module.css'
import { connect } from 'react-redux'
import Heder from '../../Ui/Heder/Heder'
import * as actions from '../../store/actions/index'
//import DataPicker from '../../Components/DatePicker/DatePicker'
//import Button from '../../Ui/Button/Button'
import Table from '../../Components/Table/Table'


let table = null





class Dashboard extends Component {



    state = {

        inputArray: [],
    }



    logOut = () => {
        this.props.logout()

    }


    componentDidMount() {


        let totalActCalories = [
            { id: "3", date: 2020 / 20 / 20, totalCalories: 300 }
        ]
        let totalMeal = [{ "date": "2020/10/13", "meal": 700 }, { "date": "2020/10/13", "meal": 1121 }]


        let currentWeight = [{ "id": 1, "date": "2020/10/20", "weight": "80" }, { "id": 2, "date": "2020/10/21", "weight": "91" }]

        if (localStorage.getItem('ACTIVITY')) {
            totalActCalories = JSON.parse(localStorage.getItem('ACTIVITY'))
        }; //geting data from local storage

        if (localStorage.getItem('totalMeal')) {
        };

        if (localStorage.getItem('currentWeight')) {
            currentWeight = JSON.parse(localStorage.getItem('currentWeight'))
        }
        console.log(localStorage.getItem('currentWeight'))

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

        let id = 0
        table = (
            <div key={'key'} >

                {this.state.inputArray.map(key => (


                    <Table date={key.date} cancel={classes.Cancel} type={key.weight} distance={key.meal ? key.meal : 0} key={Math.random()} cl={key.activity ? key.activity : 0} val={'cl'} click={() => this.deleteHandler(key.id, key.calories)} />



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
