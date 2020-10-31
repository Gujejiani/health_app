import React from 'react'
import classes from './Table.module.css'

const table = (props) => {
    return (
        <div  >
            <div className={classes.Table}>
                <span>  {props.date}</span>   <span>{props.type}</span> <span className={props.class} > {props.distance} {props.val}  </span> <span className={classes.Last} className={props.style}  > {props.cl} cl</span>
            </div>
            <div className={props.cancel} >
                <img alt="" onClick={props.click} className={classes.Cancel} src={require('../../assets/img/cancel.JPG')} />
            </div>
        </div>
    )
}

export default table