import React from 'react'
import classes from './Button.module.css'

const Button  =(props) =>{
    let button 
    if(props.disabled){
       button =  <button className={classes.ButtonOf} onClick={props.clicked} disabled={props.disabled} type='submit' >Submit</button>
    }else{
            button = <button className={classes.Button} onClick={props.clicked} disabled={props.disabled} type='submit' >Submit</button>
    }
    
 return button
}
export default Button