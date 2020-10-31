import React from 'react'


const input = (props) =>{
    return ( 
    <div>
        <label>{props.label}</label>
    <input  required={props.required} onChange={props.change}
     type={props.type} placeholder={props.placeholder}
      value={props.value} className={props.style}  />)
      </div>
    )
    }

export default input