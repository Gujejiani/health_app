import React from 'react';
import classes from './heder.module.css'
import { Link } from 'react-router-dom'

const heder = (props) => {
  return (
    <div>

      <div className={classes.Heder} >
        <Link to="/profile" ><label className={classes.Logo} >  C <span>{"&"} </span> H</label></Link>
        <nav>
          <ul className={classes.Flex} >


            {props.token ? <Link to="/health-app/profile" className={classes.link} ><li className={classes.Login} >Profile</li> </Link> : <Link to="/health-app/" className={classes.link} ><li className={classes.Login} >Login</li> </Link>}


            {props.token ? <Link to="/health-app/" className={classes.link} >     <li onClick={props.logout} className={classes.Register} >Log Out</li></Link> : <Link to="/health-app/registration" className={classes.link} >     <li className={classes.Register} >Register</li></Link>}

          </ul>
        </nav>


      </div>


    </div>
  )
}



export default heder;