
import React , { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

// import private css
import "./style.css";


/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class AboutModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="X"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      
          <div>
            <RaisedButton label="How it Works" onClick={this.handleOpen}/>
            <Dialog
              title="Work4U makes your life easier"
              bodyClassName="modal-dialog"
              actions={actions}
              modal={true}
              open={this.state.open}
              style={{backgroundColor: 'white', textAlign: 'center', fontWeight: 'bolder'}}
            >
              
                <p><h5>Need jobs done and don't have the time? Post Your Job</h5></p>
                <p><h5>Need some quick cash? Choose from the many jobs posted</h5></p>
                <p><h5>What's next? Sign Up and let us Work4U</h5></p>
              
            </Dialog>
          
        </div>
      );
    }
}

export default  AboutModal