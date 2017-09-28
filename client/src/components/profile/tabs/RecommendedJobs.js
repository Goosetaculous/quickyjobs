import React ,  { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';

import API from '../../../utils/API'

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






class RecommededJobs extends Component {
    constructor(){
        super()
        this.state = {
            // user_id: this.props.user_id
        }
    }

    applyToJob = (event,job) => {
        console.log("========Apply to Job========")
        
        console.log("job id: " + job._id)
        console.log("user id: " + this.props.user_id)
        API.applyToJob(job._id, this.props.user_id).then(function(res){
            console.log(res)
        })
        console.log("=========Apply to Job end=====")
        this.props.getRecommendedJobs();
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
                    {this.props.recommendedJobs.map((job) => ( 
                        
                            <GridTile
                                title={job.jobName}
                                titlePosition="top"
                                subtitle={job.postedBy}
                                actionIcon={
                                    <FlatButton 
                                        label="Apply" 
                                        backgroundColor="green" 
                                        color="white" 
                                        primary={true} 
                                        onClick={(event) => this.applyToJob(event, job)}
                                    />}                                
                            >
                            </GridTile>

                        
                    ))}
                </GridList>
            </div>

        )
    }

}

export default RecommededJobs;