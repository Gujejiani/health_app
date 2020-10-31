import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const datePicker = (props) =>{
    return(
        <DatePicker className={props.style} selected={ props.startDate} onChange={props.change} />
    )
}

export default datePicker