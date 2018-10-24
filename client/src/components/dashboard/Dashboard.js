import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { logoutUser } from '../../actions/authAction';
import ProfileActions from './ProfileActions';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount(){
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
   this.props.deleteAccount();
   this.props.logoutUser();
 }


  render(){
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;

    let dashboardContent;
    if(profile === null || loading){
      dashboardContent = <Spinner />
    }else{
      if(Object.keys(profile).length > 0){
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link style = {{textTransform: 'capitalize', color: 'black', fontWeight: 'bold'}} to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <br /><br /><br />
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        )
      }else{
        dashboardContent = (
          <div>
            <p className = "lead text-muted"> Welcome, <span style = {{textTransform: 'capitalize'}}>{user.name}</span></p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to = "/create-profile" className = "btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }

    return(
      <div className = "dashboard">
        <div className = "container">
          <div className = "col-md-12">
            <h1 className = "display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    profile: state.profile,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount, logoutUser})(Dashboard);
