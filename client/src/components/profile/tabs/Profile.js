import React, { Component } from 'react'
import Checkbox from 'material-ui/Checkbox';

// import Routes/API
import API from '../../../utils/API'


const SKILLS = ['Electric','Plumbing','Gardening','Automotive','Moving']

const styles = {
    block: {
        width: "40%",
    },
    checkbox: {
        marginBottom: 16,
    },
};

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            user_id: localStorage.getItem("user_id"),
            checkedValues: []
        }
    }

    componentWillMount(){


    }

    importSkillArray(){

        let skillarray = this.state.checkedValues;

        const skillObject = {
            user_id: this.state.user_id,
            "skillarray": skillarray
        }

        console.log("===================")
        console.log(skillObject);
        console.log("===================")

        API.addSkillArray(skillObject);
    }

    handleCheck(skill) {
        let checkedSkill =  `${skill}`
        this.setState(state => ({
            checkedValues: state.checkedValues.includes(checkedSkill)
                ? this.state.checkedValues.filter(c => c !== checkedSkill)
                : [...state.checkedValues, checkedSkill]
        }));
    }

    renderCheckbox(skill){
        return(
            <Checkbox
                label={skill}
                key={`${skill}`}
                onCheck={() => this.handleCheck(skill)}

                style={styles.checkbox}
            />
            )

    }

    render(){
        return(
            <div className="container" style={{width:"80%"}}>
                {this.importSkillArray()}
                <div style={styles.block}>
                    <h5>Select the job types you are interested in</h5>
                    {
                        SKILLS.map((data,index)=>this.renderCheckbox(data))
                    }
                </div>
            </div>
        )
    }
}

export default Profile