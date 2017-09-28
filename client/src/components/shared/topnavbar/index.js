// import react
import React , { Component } from 'react';

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

// import private css
import "./style.css";



const style = {
    margin: 12,
};

class Login extends Component {
    static muiName = 'FlatButton';
  
    render() {
        return (
            <span>
                <RaisedButton label="Sign In" primary={true} style={style} />
                <RaisedButton label="Sign Up" primary={true} style={style} />
            </span>
        );
    }
}

const Logged = (props) => (
    <IconMenu
        {...props}
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
    <MenuItem primaryText="Sign out" />
    </IconMenu>
);

class Homepage extends Component{
    state = {
        logged: true,
    };
    handleChange = (event, logged) => {
        this.setState({logged: logged});
    };
    render(){
        return(
            <div>
                <Toggle label="Logged" defaultToggled={true} onToggle={this.handleChange} labelPosition="right" style={{margin: 20}} />
                <AppBar
                    title={<img src="./logo.png/>}
                    className="white-app-bar"
                    iconClassNameRight={<img src="./logo.png/>}
                    iconElementLeft={<span><FlatButton label="About" primary={true} /><FlatButton label="Sign Up" primary={true} /></span>}
                    iconElementRight={this.state.logged ? <Logged /> : <Login />}
                />
            </div>
        )
    }
}

export default  Homepage