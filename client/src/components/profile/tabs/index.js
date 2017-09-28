import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// Components
import Profile from './Profile'
import AppliedJobs from './AppliedJobs.js';
import RecommendedJobs from './RecommendedJobs.js';
import JobsPostedByMe from './JobsPostedByMe.js';
import ConfirmedJobs from './ConfirmedJobs.js';
import Reviews from './Reviews.js'

import API from '../../../utils/API'


// import card from shared
import Cardsv2 from '../../shared/cardsv2'

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};


class ProfileTabs extends Component {

    constructor() {
        super();
        this.state = {
            recommendedCards: {},
            appliedJobs:[],
            selectedIndex: -1,
            recommendedJobs: []
        }
    };

    renderRecommendedCards() {
        let recommendedCards = {};

        return this.state.recommendedCards.map(card => (
          <Cardsv2
            job_description={card.job_description} 
            job_title={card.job_title}
          />
        ));
    };

    //================================================
    // Function to call User Applied Data
    //================================================

    getAppliedJobs = () => {
        console.log("==================Job Applied Start====================")
        console.log(this.props._id)
        API.getAppliedJobs(this.props._id).then((res)=>{
            console.log("RES Applied: ",res)
            console.log("==================Job Applied END====================")
            this.setState({appliedJobs: res.data})
        }).catch((err)=>{
            console.log("ERR ",err)
        })   
    }


    //================================================
    // Function to call User Recommended Data
    //================================================

   getRecommendedJobs = () => {
        console.log("==================Recommeneded Job Start====================")
        console.log(this.props.skills)
        API.getRecommendedJobs(this.props._id,this.props.skills).then((res)=>{
            console.log("RES Recommended: ",res)
            console.log("==================Recommended JOb END====================")
            this.setState({recommendedJobs: res.data})
        }).catch((err)=>{
            console.log("ERR ",err)
        })   
    }



    render(){
        {this.props.jobsdata}
        return(
            
            <Tabs initialSelectedIndex = {-1}>
                <Tab label="My Skills" >
                    <div>
                       <Profile
                           skills={this.props.skills}
                           _id ={this.props._id}
                           setSkills={this.props.setSkills}
                       />
                        {/*<FlatButton label="Default" onClick={()=>this.props.f1("TEST")} />*/}
                    </div>
                </Tab>
                <Tab 
                    onActive={this.getAppliedJobs}
                    label="Jobs I Applied" 
                >
                    <div>
                        <h2 style={styles.headline}>Jobs I Applied</h2>
                        <AppliedJobs  
                            appliedJobs={this.state.appliedJobs}
                            getAppliedJobs={this.getAppliedJobs}
                            user_id={this.props._id}
                         />
                    </div>
                </Tab>
                <Tab
                    onActive={this.getRecommendedJobs} 
                    label="Look For A Job" >
                    <div>
                        <div>
                            <h2 style={styles.headline}>Look For A Job</h2>
                        </div>
                        <div>
                           <RecommendedJobs 
                                user_id={this.props._id}
                                recommendedJobs={this.state.recommendedJobs}
                                getRecommendedJobs={this.getRecommendedJobs}
                           />
                        </div>
                    </div>
                </Tab>
                <Tab label="Jobs Posted By Me" >
                    <div>
                        <h2 style={styles.headline}>Jobs Posted By Me</h2>
                        <JobsPostedByMe />
                    </div>
                </Tab>
                <Tab label="Confirmed Jobs" >
                    <div>
                        <h2 style={styles.headline}>Confirmed Jobs</h2>
                        <ConfirmedJobs />
                    </div>
                </Tab>
                <Tab label="Reviews" >
                    <div>
                        <h2 style={styles.headline}>Reviews</h2>
                        <Reviews />
                    </div>
                </Tab>
            </Tabs>
        )
    }
}

export default ProfileTabs