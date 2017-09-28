// import react
import React , { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import "./style.css"

/*const styles = {
    background: "url(http://youngworkers.org/wp-content/uploads/2010/02/teen-banner.png) no-repeat center center",
    margin: "10px 20px 10px 20px",
    backgroundSize: "contain",
    height: "200px",
}*/

// import private components
// import TopNavbar from "../shared/topnavbar/";
//import HomePageJobList from "./HomePageJobList.js";

// import NavBar Login TESTING
import Navtest from "../shared/Navtest/";
// import NavBar Login TESTING
import AboutModal from "../AboutModal/";
// Import of auth
import Auth from '../../Auth/Auth';



//Auth Constant
const auth = new Auth();




class Homepage extends Component{
    render(){

        return(

            <div>
                <Navtest />
                <div className="hook-line" >

                    Less Doing, More Saving
                   
                <AboutModal /> 
                    
                    
                </div>
                

            </div>
        )
    }
}

export default  Homepage