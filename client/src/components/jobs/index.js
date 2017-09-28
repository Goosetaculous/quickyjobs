import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SideBar from '../../components/shared/sidebar'
import Wrapper from '../../components/shared/content'
import PopulateCards from '../shared/1buttoncards/'
import FlatButton from 'material-ui/FlatButton';

//API

import API from '../../utils/API'



class Jobs extends Component{
    constructor(){
        super()
        this.state={
            jobs:[]
        }
    }
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

    componentDidMount(){
        API.getAllJobs(localStorage.getItem("db_id")).then((res)=>{
            this.setState({
                jobs: res.data
            })
        })
    }

    render(){
        const { profile } = this.state;
        return(
            <div className="container">
                <SideBar picture={profile.picture} given_name={profile.given_name} family_name={profile.family_name}/>
                <Wrapper>
                    <div style={{textAlign: "center"}}>
                        <TextField hintText="Job Keywords"/><FlatButton label="Search" primary={true}/>
                        <br/>
                        <PopulateCards jobs={this.state.jobs}/>
                    </div>
                </Wrapper>
            </div>
        )
    }
}

export default Jobs