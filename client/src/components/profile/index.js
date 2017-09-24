import React , { Component } from 'react'
import SideBar from '../../components/shared/sidebar'
import Wrapper from '../../components/shared/content'
import ProfileTabs from './tabs/'
import API from '../../utils/API'

import FlatButton from 'material-ui/FlatButton';




//REDUX STUFF

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//import actions
import {selectUser} from '../../actions/';


// NOTES:
// Job Status: initiated , applied , confirmed , completed 


class Profile extends Component{
    constructor() {
        super();
        this.state = {
          test: ""
        }
    };


    componentWillMount() {
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
            });
        } else {
            this.setState({ profile: userProfile });
        }
    }

    test = (test) => {
        console.log("hello from test");
        console.log(test, this)
        this.setState({test:test});

        return 
    }

    postStateToApplied = (applied) =>{
        console.log("================================")
        console.log("Post to Applied function triggered")

    }

  
    getUserId(){

        console.log("===============GET USER INFO ID=================")
        console.log("Get user ID function triggered")
        
        let userObject = API.getUser(localStorage.getItem('user_id')).then((res) => {
            console.log(res.data[0]);
               console.log("================GET USER INFO ID END================")
        });

     
    }




    render(){
        const { profile } = this.state;

        {this.getUserId()}
        return(

            <div className="container">

                <SideBar picture={profile.picture} given_name={profile.given_name} family_name={profile.family_name}/>
                <Wrapper>
                    
                    <div onClick={()=>this.props.test_action("YO")}>
                        <ProfileTabs passfunction={this.test}/>
                    </div>

                </Wrapper>
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.users
    }
}

//dispatch -  call a function
function matchDispatchToProps(dispatch){

    return bindActionCreators({
        test_action: selectUser
    },dispatch)

}


export default connect(mapStateToProps,matchDispatchToProps)(Profile)