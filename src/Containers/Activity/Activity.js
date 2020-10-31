import React, { Component } from 'react'
import classes from './Activity.module.css'
import { connect } from 'react-redux'
import Heder from '../../Ui/Heder/Heder'
import * as actions from '../../store/actions/index'
import DataPicker from '../../Components/DatePicker/DatePicker'
import Button from '../../Ui/Button/Button'
import Table from '../../Components/Table/Table'


let table = null
let id = 0
let totalCalories = 0;
let totalCl = []


let data = {
    activity: 1200
}


let desiredActivity = data.activity

class Activity extends Component {
    state = {
        date: new Date(),
        newDate: null,
        type: null,
        km: null,
        calories: null,
        inputArray: [],
        count: 0,

    }

    componentDidMount() {

        if (localStorage.getItem('userInfo')) {
            data = JSON.parse(localStorage.getItem('userInfo')) //geting data from local storage
            desiredActivity = parseInt(data.meal)
        }

        // 
        console.log(desiredActivity)
    }


    //counting burned calories  from kilometres
    measure(type) {
        let calories = null
        let km = this.state.km;

        switch (type) {
            case 'Swiming':
                calories = km * 300;
                return (
                    this.setState({ calories: calories })
                )
            case 'Hiking':
                calories = km * 40;
                return (
                    this.setState({ calories: calories })
                )
            case 'Running':
                calories = km * 140;
                return (
                    this.setState({ calories: calories })
                )


            default:
                return calories

        }


    }



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

    //  selecttttttttttttttttttttt Handler
    selectHandler = (e) => {
        let type = e.target.value;
        this.setState({ type: type })

        setTimeout(() => {
            this.measure(this.state.type)


        }, 100)

    }


    submitHandler = (e) => {
        e.preventDefault()


        totalCalories = totalCalories + this.state.calories //sum of the calories
        const array = this.state.inputArray

        id += 1
        array.push({
            id: id,
            date: this.state.newDate,
            type: this.state.type,
            distance: this.state.km,
            calories: this.state.calories,
            totalCalories: totalCalories

        })

        this.setState({ inputArray: array })

        this.setState(prewState => {
            return {
                count: prewState.count + 1
            }
        })

        console.log(this.state.inputArray)
    }




    deleteHandler = (e, calories) => {


        totalCalories = totalCalories - calories



        const inputArray = this.state.inputArray









        const updatedInputArray = inputArray.filter(x => x.id !== e) //deleting clicked input from the state

        this.setState({ inputArray: updatedInputArray })
        this.setState(prewState => {
            return {
                count: prewState.count - 1
            }
        })


    }
    storageSubmittedHandler = () => {


        console.log(this.state.inputArray)
        totalCl.push({
            date: this.state.newDate,
            activityCl: totalCalories

        })

        localStorage.setItem('ACTIVITY', JSON.stringify(this.state.inputArray))
        //localStorage.setItem('activity', JSON.stringify(currenActivity) )
        //localStorage.setItem('totalCalories', JSON.stringify(totalCl) )

    }

    inputHandler = (e) => {
        let km = e.target.value;

        this.setState({ km: km })
        setTimeout(() => {
            this.measure(this.state.type)


        }, 100)

    }

    render() {
        table = (
            <div>
                {this.state.inputArray.map(key => (

                    key.date && key.type ?
                        <Table date={key.date} type={key.type} val={'km'} cl={key.calories} key={key.id} distance={key.distance} click={() => this.deleteHandler(key.id, key.calories)} style={key.calories >= desiredActivity ? classes.Green : classes.Red} /> : null


                ))}
            </div>

        )


        return (

            <div>
                <Heder logout={this.logOut} token={this.props.token} />
                <h1 className={classes.h1} >Enter the form to see the list</h1>

                <div className={classes.Background}>
                    <div className={classes.Container}>

                        <form onSubmit={this.submitHandler} >

                            <label className={classes.labels} >Date</label>
                            <DataPicker style={classes.Date} startDate={this.state.date} change={date => this.dateHandler(date)} />

                            <label className={classes.labels}  >Activity Type</label>


                            <select className={classes.Select} placeholder="Enter Your Weight" type='number' onChange={this.selectHandler} >

                                <option defaultValue ></option>
                                <option>Hiking</option>
                                <option>Swiming</option>
                                <option>Running</option>


                            </select>
                            <label className={classes.labels}  >Activity in Km</label>
                            <input placeholder="Enter Km " type='number' onChange={this.inputHandler} />


                            <Button disabled={this.state.count < 4 && this.state.km && this.state.type && this.state.newDate ? false : true} />
                        </form>

                    </div>

                    {this.state.count > 0 ? <div className={classes.Show}>
                        {this.state.count > 0 ? <div className={classes.Spans} >
                            <span>Date </span> <span>Type</span><span> Distance</span><span>Burned Cl</span>
                        </div> : null}
                        {table}

                        {this.state.count === 0 ? null : <button onClick={this.storageSubmittedHandler} className={classes.Save} type="button" >Save</button>}


                    </div> : null}

                    {this.state.count < 3 ? null : <p>Please remove older Activity</p>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Activity)