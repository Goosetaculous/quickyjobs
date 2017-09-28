import React , { Component } from 'react'
import SideBar from '../../components/shared/sidebar'
import Wrapper from '../../components/shared/content'
import ProfileTabs from './tabs/'
import API from '../../utils/API'

// NOTES:
// Job Status: initiated , applied , confirmed , completed 

class Profile extends Component{
    constructor() {
        super();
        this.state = {
          skills:[],
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

    componentDidMount(){
        API.getUser(localStorage.getItem('user_id')).then((res)=>{
            this.setState({
                skills: res.data[0].skills || [],
                _id: res.data[0]._id
            })
        }).catch((err)=>{
            console.log("ERR ",err)
        })
    }

    setSkills = (data)=>{
        this.setState({
            skills: data
        })
    }

    render(){
        const { profile } = this.state;
        return(
            <div className="container">
                <SideBar picture={profile.picture} given_name={profile.given_name} family_name={profile.family_name}/>
                <Wrapper>
                    <div>
                        <ProfileTabs
                            skills={this.state.skills}
                            _id={this.state._id}
                            setSkills={this.setSkills}
                        />
                    </div>
                </Wrapper>
            </div>
        )
    }
}

export default  Profile