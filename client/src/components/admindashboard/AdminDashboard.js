import React, { Component } from 'react'
import { getAllProfile,setProfile } from '../../actions/authActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AdminDashboard extends Component {
    componentDidMount() {
        this.props.getAllProfile();
        localStorage.removeItem("viewUser")
    }

    setUser =(user)=>{
        localStorage.setItem('viewUser',JSON.stringify(user))
        this.props.setProfile(user)
    }

    render() {
        const { profiles} = this.props.auth;
        return (
            <React.Fragment>
                <h1>Admin</h1>
                {   
                    profiles.map((profile) => 
                        <Link  key={profile.id}  to="/Admindashboard/profile" onClick={()=>this.setUser(profile)}>
                            <div className="card">
                                <div className="card-body">
                                    <ul>
                                        <li>
                                            {profile.name}
                                        </li>
                                        <li>
                                            {profile.email}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    )

                }
            </React.Fragment>
        )
    }
}

AdminDashboard.propTypes = {
    getAllProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    meals:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    meals:state.meals
});
export default connect(mapStateToProps, { getAllProfile,setProfile })(AdminDashboard);