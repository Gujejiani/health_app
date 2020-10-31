
import React, { Component } from 'react';
import classes from './Weight.module.css'
import Heder from '../../Ui/Heder/Heder'
import * as actions from '../../store/actions/index'
import DataPicker from '../../Components/DatePicker/DatePicker'
import Button from '../../Ui/Button/Button'
import { connect } from 'react-redux'



let label = null
let id = 0






let currentWeight = null

class Weight extends Component {

    state = {
        date: new Date(),
        newDate: null,
        weight: null,
        inputArray: [],
        count: 0,

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


    inputHandler = (e) => {
        let weight = e.target.value;
        this.setState({ weight: weight })


    }


    submitHandler = (e) => {

        //const dateAllow = this.state.newDate "FIXME" ერთი და იგივე თარიღი რო არ შევიდეს ორჯერ

        e.preventDefault()

        //console.log(dateAllow ===this.state.newDate )

        const array = this.state.inputArray

        id += 1
        array.push({
            id: id,
            date: this.state.newDate,
            weight: this.state.weight
        })



        this.setState({ inputArray: array })

        this.setState(prewState => {
            return {
                count: prewState.count + 1
            }
        })







    }




    deleteHandler = (e) => {


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
        currentWeight = this.state.inputArray

        localStorage.setItem('currentWeight', JSON.stringify(currentWeight))

    }

    render() {
        let data = {
            weight: 70
        }
        let desiredWeight = parseInt(data.weight)
        if (localStorage.getItem('userInfo')) {
            data = JSON.parse(localStorage.getItem('userInfo'))
            desiredWeight = data.weight
        }



        label = (
            <div>
                {this.state.inputArray.map(key => (

                    key.date && key.weight ?
                        <div className={classes.TableHolder} key={key.id} ><span className={classes.span} >Date:    {key.date} </span>  Weight: <span key={key.id + 3} className={parseInt(key.weight) <= desiredWeight ? classes.Green : classes.Red} > {key.weight} kg  </span>   <img alt="" onClick={() => this.deleteHandler(key.id)} className={classes.Img} src={require('../../assets/img/cancel.JPG')} /> </div> : null //mapping date and weight values

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

                            <label className={classes.labels}  >Weight</label>
                            <input placeholder="Enter Your Weight" type='number' onChange={this.inputHandler} />

                            <Button disabled={this.state.count < 4 && this.state.newDate && this.state.weight ? false : true} />
                        </form>

                    </div>

                    {this.state.count > 0 ? <div className={classes.Show}>

                        {label}

                        {this.state.count === 0 ? null : <button onClick={this.storageSubmittedHandler} className={classes.Save} type="button" >Save</button>}

                        {this.state.count < 4 ? null : <p>Please remove older Weight</p>}
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
        logout: () => dispatch(actions.logout()),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Weight)