// import react
import React , { Component } from 'react';

// import private css
import "./style.css";

// import material ui
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import RaisedButton from 'material-ui/RaisedButton';

//import logo
//import "./logo.png"
// Import of auth
import Auth from '../../../Auth/Auth';

// Import API
import API from "../../../utils/API";

//Auth Constant
const auth = new Auth();


const style = {
    margin: 12,
};

const image = require('./logo.png')
console.log(image); // '/build/12as7f9asfasgasg.jpg'


class Login extends Component {
    static muiName = 'FlatButton';
    login() {
      auth.login();
    }

    logout() {
      auth.logout();
    }
  
    render() {
        const { isAuthenticated } = auth;
        return (
        <div>
            {
              !isAuthenticated() && (
                <RaisedButton
                  label="log in"
                  style={style}
                  onClick={this.login.bind(this)}
                />
              )
            }
            {
              isAuthenticated() && (
                <IconMenu
                 
                  iconButtonElement = {
                    <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem primaryText="Jobs I might be interested in" />
                  <MenuItem primaryText="Jobs I applied" />
                  <MenuItem primaryText="Jobs I posted" />
                  <MenuItem primaryText="Jobs completed" />
                  <MenuItem primaryText="Sign Out" onClick={this.logout.bind(this)} />
                  
                </IconMenu>
              )
            }
           </div>
        );
    }
}


class Navtest extends Component{
    state = {
        logged: true,
    };
    handleChange = (event, logged) => {
        this.setState({logged: logged});
    };
    render(){
        const { isAuthenticated } = auth;
        return(
            <div>
                <AppBar
                    className="white-app-bar"
                    style={{backgroundColor: 'transparent'}}
                    iconElementLeft={<img className='logo' src={image} />}
                    iconElementRight={ <Login />}
                />
                
            </div>
        )
    }
}

export default Navtest