import React, { Component } from 'react'
import classes from './Meal.module.css'
import { connect } from 'react-redux'
import Heder from '../../Ui/Heder/Heder'
import * as actions from '../../store/actions/index'
import DataPicker from '../../Components/DatePicker/DatePicker'
import Button from '../../Ui/Button/Button'
import Table from '../../Components/Table/Table'

let meal = []
let table = null
let id = 0
let totalCalories = 0;
const data = JSON.parse(localStorage.getItem('userInfo')) //geting data from local storage
let desiredMeal = parseInt(data.meal)

class Meal extends Component {
    state = {
        date: new Date(),
        newDate: null,
        name: null,
        calories: null,
        inputArray: [],
        count: 0,

    }



    //counting burned calories  from kilometres




    dateHandler = (date) => {
        let dateObj = null
        dateObj = date

        //getting from dateObject only year day and month
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        let newdate = year + "/" + month + "/" + day;

        this.setState({ newDate: newdate })

        this.setState({ date: date })



    }

    logOut = () => {

        this.props.logout()
    }





    submitHandler = (e) => {
        e.preventDefault()
        let calories = parseInt(this.state.calories)

        totalCalories = totalCalories + calories  //sum of the calories
        const array = this.state.inputArray

        id += 1
        array.push({
            id: id,
            date: this.state.newDate,
            name: this.state.name,
            calories: this.state.calories,
            totalCalories: totalCalories
        })


        this.setState({ inputArray: array })

        this.setState(prewState => {
            return {
                count: prewState.count + 1
            }
        })

    }



    deleteHandler = (e, calories) => {


        totalCalories = totalCalories - calories



        const inputArray = this.state.inputArray

        console.log(totalCalories)


        const updatedInputArray = inputArray.filter(x => x.id !== e) //deleting clicked input from the state

        this.setState({ inputArray: updatedInputArray })
        this.setState(prewState => {
            return {
                count: prewState.count - 1
            }
        })


    }
    storageSubmittedHandler = () => {


        meal.push({
            date: this.state.newDate,
            meal: totalCalories
        })


        localStorage.setItem('totalMealCalories', JSON.stringify(totalCalories))
        localStorage.setItem('totalMeal', JSON.stringify(meal))

    }

    nameHandler = (e) => {
        let name = null
        name = e.target.value
        this.setState({ name: name })

    }
    caloriesHandler = (e) => {
        let calories = null;
        calories = e.target.value;
        this.setState({ calories: calories })

    }

    render() {
        table = (
            <div>
                {this.state.inputArray.map(key => (

                    key.name && key.calories ?
                        <Table date={key.date} type={key.name} cl={key.calories} key={key.id} distance={key.calories} val={'cl'} class={desiredMeal >= totalCalories ? classes.Green : classes.Red} click={() => this.deleteHandler(key.id, key.calories)} style={classes.Hide} /> : null


                ))}
            </div>

        )


        return (

            <div>
                <Heder logout={this.logOut} token={this.props.token} />
                <h1 className={classes.h1} >Enter the form to list Your Meals</h1>

                <div className={classes.Background}>
                    <div className={classes.Container}>

                        <form onSubmit={this.submitHandler} >

                            <label className={classes.labels} >Date</label>
                            <DataPicker style={classes.Date} startDate={this.state.date} change={date => this.dateHandler(date)} />





                            <label className={classes.labels}  >name of food</label>
                            <input placeholder="Enter food name " type='text' onChange={this.nameHandler} />
                            <label className={classes.labels}  >meal calories</label>
                            <input placeholder="Enter calories " type='number' onChange={this.caloriesHandler} />


                            <Button disabled={this.state.count < 4 && this.state.calories && this.state.name && this.state.newDate ? false : true} />
                        </form>

                    </div>

                    {this.state.count > 0 ? <div className={classes.Show}>
                        {this.state.count > 0 ? <div className={classes.Spans} >
                            <span>Date </span> <span>Name</span><span> Calories</span>
                        </div> : null}
                        {table}

                        {this.state.count === 0 ? null : <button onClick={this.storageSubmittedHandler} className={classes.Save} type="button" >Save</button>}
                        {this.state.count > 0 ? <div className={classes.Total}>
                            <label>Desired {desiredMeal} cl </label>
                            <label >total {totalCalories} cl</label>
                        </div> : null}
                    </div> : null}


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

export default connect(mapStateToProps, mapDispatchToProps)(Meal)

