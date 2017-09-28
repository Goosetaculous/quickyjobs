import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Profile from './components/profile/'
import Home from './components/home/';
import Jobs from './components/jobs/'
import Applicant from './components/applicant';
import PostJob from './components/postjob';


import Footer from './components/shared/footer'
//import Navpills from './components/shared/navpills';
import "./App.css";

//Auth Imports
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import { Route, Router, Redirect } from 'react-router-dom';

// API import
import API from "./utils/API";

//Auth Constant
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}




class App extends Component {
    constructor(){
        super()
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Router history={history} component={App}>
                        <div>

                            <Route exact path="/home" render={(props) => <Home auth={auth} {...props} />} />

                            <Route exact path="/" render={(props) => (
                                auth.isAuthenticated()) ? (
                                    <Profile auth={auth} {...props} /> 
                                ):(<Redirect to="/home"/>) } />
                            <Route exact path="/Jobs" render={(props) =>(
                                auth.isAuthenticated()) ? (
                                    <Jobs auth={auth} {...props} />
                                ):(<Redirect to="/home"/>) } />

                            <Route exact path="/profile" render={(props) =>(
                                auth.isAuthenticated()) ? (
                                <Profile auth={auth} {...props} />
                            ):(<Redirect to="/home"/>) } />


                            <Route exact path="/applicant" render={(props) => (
                                auth.isAuthenticated()) ? (
                                <Applicant auth={auth} {...props} />
                            ):(<Redirect to="/home"/>) } />
                            <Route exact path="/postjob" render={(props) => (
                                auth.isAuthenticated()) ? (
                                <PostJob auth={auth} {...props} history={history} />
                            ):(<Redirect to="/home"/>) } />
                            
                            <Route exact path="/callback" render={(props) => {

                            handleAuthentication(props);
                            return <Callback {...props} />
                              }}/>

                        </div>
                    </Router>
                </MuiThemeProvider>
                <Footer/>
            </div>
        );
    }
}

export default App;
