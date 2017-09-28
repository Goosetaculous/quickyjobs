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


class AppliedJobs extends Component {
    constructor(){
        super()
    }

    cancel = (event,job) => {
        console.log("========Cancel Applied Job========")
        
        console.log("job id: " + job._id)
        console.log("user id: " + this.props.user_id)
        API.removeApplicant(job._id, this.props.user_id).then(function(res){
            console.log(res)
        })
        console.log("=========Cancel Applied end=====")
        this.props.getAppliedJobs();
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
                    {this.props.appliedJobs.map((job) => (
                        
                        <GridTile
                            title={job.jobName}
                            titlePosition="top"
                            subtitle={job.postedBy}
                            actionIcon={ 
                                <FlatButton 
                                    label="Cancel Application" 
                                    backgroundColor="#F53F30" 
                                    color="white" 
                                    primary={true} 
                                    onClick={(event) => this.cancel(event, job)}
                                />}
                        >
                        </GridTile>
                    ))}
                </GridList>
            </div>

        )
    }

}

export default AppliedJobs;