import React , { Component } from 'react';
import SideBar from '../../components/shared/sidebar'
import Wrapper from '../../components/shared/content'
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 200,
  },
};

class PostJob extends Component {

	state = {jobType: {value: 1}}; // default job type

	constructor(props){
		
		super(props);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (event) => {
    	event.preventDefault();
		//alert('Your job was submitted');
		console.log(this.state);
		fetch('/job/add', {  
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'jobName': this.state.jobName,
				'postedBy': localStorage.getItem('user_id'),
				'jobType': this.state.jobType,
				'jobLocation': this.state.jobLocation,
				'jobDate': this.state.jobDate,
				'jobPrice': this.state.jobPrice
			})
		  }).then(data => data.json()).then(data => {
			  console.log(data)
			  window.location.reload(); // @job/goose, you guys may remove this once your parent state stuff is working
		  });
		  
  	}
	
	handleInputChange = (event) => {

	    const target = event.target;
	    const value = target.value;
		const name = target.name;
		
		console.log("Event: ");
		console.log(event);

	    this.setState({
	      [name]: value
	    });

	    console.log("Changing state field " + name + " to " + value);
	 }

	 // a dedicated on change event handler must be implemented for date picker
	 // see http://www.material-ui.com/#/components/date-picker for "onChange"
	 handleDateChange = (event, date) => {
		 console.log("Date is");
		 console.log(date);
		 this.setState({jobDate: date});
	 }

	 // a dedicated on change event handler must be implemented for dropdown menu
	 // see http://www.material-ui.com/#/components/dropdown-menu
	 handleMenuChange = (event, index, value) => {
		 console.log("Selected type of job is");
		 console.log(value);
		 this.setState({jobType: value});
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

	render() {
	    const { profile } = this.state;
	    return (
		<div className="container">
			<SideBar picture={profile.picture} given_name={profile.given_name} family_name={profile.family_name}/>
			<Wrapper>
				<h5>Post A Job</h5>
				<div style={{width: "50%", float: "left"}}>

					<TextField
						name='jobName'
						hintText="Job name"
						errorText="Required"
						onChange={this.handleInputChange}
					/>

					<DatePicker
						name='JobDate'
						hintText="When do you want to get it done"
						errorText="Required"
						value={this.state.jobDate}
						onChange={this.handleDateChange}
					/>

					<TextField
						name='jobLocation'
						hintText="Your location"
						errorText="Required"
						onChange={this.handleInputChange}
					/>
				</div>

				<div style={{width: "50%", float: "right"}}>
					
				
					<TextField
						name='jobPrice'
						hintText="How much you want to pay"
						errorText="Required"
						onChange={this.handleInputChange}
					/>

					<div>
						<DropDownMenu value={this.state.jobType} onChange={this.handleMenuChange}>
							<MenuItem value={1} primaryText="Home" />
							<MenuItem value={2} primaryText="Auto" />
							<MenuItem value={3} primaryText="Moving" />
							<MenuItem value={4} primaryText="Gardening" />
						</DropDownMenu>
					</div>
					
					<RaisedButton label="Submit" primary={true}  onClick={(event) => this.handleClick(event)}/>
				</div>

			</Wrapper>
		</div>

    );
  }
}



export default PostJob;