import React , { Component } from 'react'
import SideBar from '../../components/shared/sidebar'
import Wrapper from '../../components/shared/content'
import ProfileTabs from './tabs/'


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

    render(){
        const { profile } = this.state;

        return(

            <div className="container">
                <SideBar picture={profile.picture} given_name={profile.given_name} family_name={profile.family_name}/>
                <Wrapper>
                    <div>
                        <ProfileTabs passfunction={this.test}/>
                    </div>

                </Wrapper>
            </div>

        )
    }
}

export default  Profile