import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/home/'
import Profile from './components/profile/'
import Navpills from './components/shared/navpills'

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
            <Router>
                <div>
                    <Navpills/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Profile" component={Profile}/>

                </div>
            </Router>
        </MuiThemeProvider>
        );
    }
}

export default App;
