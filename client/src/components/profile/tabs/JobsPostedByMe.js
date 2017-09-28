import React ,  { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import API from '../../../utils/API.js';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 1000,

        overflowY: 'auto',
    },
};

/*const tilesData = [
    {
        img: 'https://pixy.org/images/placeholder.png',
        title: 'Mow my Law',
        author: 'UCSD',
        featured: true,
    },
    {
        img: 'https://pixy.org/images/placeholder.png',
        title: 'Clean my car',
        author: 'Carlsbad',
    },
    {
        img: 'images/grid-list/camera-813814_640.jpg',
        title: 'Camera',
        author: 'Danson67',
    },
    {
        img: 'images/grid-list/morning-819362_640.jpg',
        title: 'Morning',
        author: 'fancycrave1',
        featured: true,
    },
    {
        img: 'images/grid-list/hats-829509_640.jpg',
        title: 'Hats',
        author: 'Hans',
    },
    {
        img: 'images/grid-list/honey-823614_640.jpg',
        title: 'Honey',
        author: 'fancycravel',
    },
    {
        img: 'images/grid-list/vegetables-790022_640.jpg',
        title: 'Vegetables',
        author: 'jill111',
    },
    {
        img: 'images/grid-list/water-plant-821293_640.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
    },
];*/


class JobsPostedByMe extends Component {

    state = {jobs: []};

    constructor(){
        super()
    }

    componentWillMount() {
        //fetch("/job/all").then(res => res.json()).then(jobs => this.setState({jobs}));
        API.findJobsByPosterId(localStorage.getItem('user_id')).then((res) => {
            console.log("Data from findJobsByPoesterId: ");
            console.log(res);
            this.setState({jobs: res.data});
        });
    }

    removeJobByIdAndRemoveApplicationById = (event, jobId, applicanttId) => {
        console.log("Trying to stop posting.");
        console.log(jobId);
        API.removeJobByIdAndRemoveApplicationById(jobId, applicanttId).then((res) => {
            alert("job with id " + jobId + " was removed");
            alert("also, applicant ")
        });
    };

    removeOnlyJobById = (event, jobId) => {
        console.log("Trying to stop posting.");
        console.log(jobId);
        API.removeOnlyJobById(jobId).then((res) => {
            alert("job with id " + jobId + " was removed");
            alert("also, applicant ")
        });
    };

    confirmJobById = (event, jobId) => {
        console.log("Trying to set below job confirmed.");
        console.log(jobId);
        API.confirmJobById(jobId).then((res) => {
            alert("job with id " + jobId + " was confirmed");
        });
    };

    declineApplicantById = (event, applicantId) => {
        console.log("Trying to set below job confirmed.");
        console.log(applicantId);
        API.declineApplicantById(applicantId).then((res) => {
            alert("applicant with id " + applicantId + " was declinde");
        });
    }

    render(){
        return(
            <div style={styles.root}>
                <GridList
                    cellHeight={180}
                    style={styles.gridList}
                    cols={4}
                    padding={3}
                >
                    {this.state.jobs.map((job) => {
                        if (job.status == "applied" ) {
                            return <GridTile
                                        title={job.jobName}
                                        titlePosition="top"
                                        subtitle={job.location}
                                        actionIcon={
                                            <div>
                                                <FlatButton label="Stop Posting" backgroundColor="#F53F30" primary={true} onClick={(event) => this.removeJobByIdAndRemoveApplicationById(event, job._id, job.appliedBy)}/>
                                                <FlatButton label="Confirm" backgroundColor="#F53F30" primary={true} onClick={(event) => this.confirmJobById(event, job._id)}/>
                                                <FlatButton label="Decline" backgroundColor="#F53F30" primary={true} onClick={(event) => this.declineApplicantById(event, job.appliedBy)}/>
                                            </div>}
                                    >
                                    </GridTile>
                        }
                        else {
                            return <GridTile
                                        title={job.jobName}
                                        titlePosition="top"
                                        subtitle={job.location}
                                        actionIcon={<FlatButton label="Stop Posting" backgroundColor="#F53F30" primary={true} onClick={(event) => this.removeOnlyJobById(event, job._id)}/>}
                                    >
                                    </GridTile>
                        }
                        
                    })}
                </GridList>
            </div>

        )
    }

}

export default JobsPostedByMe;