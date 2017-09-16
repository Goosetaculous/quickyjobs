import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Profile from './components/profile/'
import Home from './components/home/';
import Jobs from './components/jobs/'
import Applicant from './components/applicant';
import PostJob from './components/postjob';

import Footer from './components/shared/footer'
import Navpills from './components/shared/navpills';
import "./App.css";

//Auth Imports
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import { Route, Router, Redirect } from 'react-router-dom';

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
    handleAuthenticated(data){
        console.log(data)

    }


    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Router history={history} component={App}>
                        <div>
                            <Navpills/>
                            <Route path="/profile" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/"/>
                                ) : (
                                    <Profile auth={auth} {...props} />
                                )
                            )} />


                            {/*<Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />*/}
                            <Route exact path="/" render={(props) => (
                                auth.isAuthenticated()) ? (
                                    <Profile auth={auth} {...props} />
                                ):(
                                    <Home/>
                                ) } />
                            {/*<Route exact path="/Profile" render={(props) => (*/}
                                {/*!auth.isAuthenticated() ? (*/}
                                    {/*<Redirect to="/"/>*/}
                                {/*) : (*/}
                                    {/*<Profile auth={auth} {...props} />*/}
                                {/*)*/}
                            {/*)} />*/}
                            <Route exact path="/Jobs" render={(props) => <Jobs auth={auth} {...props} />} />
                            <Route exact path="/applicant" render={(props) => <Applicant auth={auth} {...props} />} />
                            <Route exact path="/PostJob" render={(props) => <PostJob auth={auth} {...props} />} />
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
