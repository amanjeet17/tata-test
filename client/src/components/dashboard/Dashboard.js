import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, getUserProfile ,clearUserMeal} from '../../actions/mealActions';
import Spinner from '../common/Spinner';
import AddMeal from './AddMealCard';
import MyMeals from './MyMeals';
import moment from 'moment';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      userName:"",
      userId:undefined
    }
  }
  componentDidMount() {
    const { name, role } = this.props.auth.user;
    if (role === 'admin') {
      let user = JSON.parse(localStorage.getItem('viewUser'))
        this.props.getUserProfile(user.id);
        const {name:_name ,id:_id} = JSON.parse(localStorage.getItem('viewUser'))
        this.setState({userName: _name,userId: _id})
    }
    else {
      this.props.getCurrentProfile();
      this.setState({ userName :name})
    }
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  componentWillUnmount() {
    this.props.clearUserMeal();
  }

  render() {
    const { userName,userId  } = this.state;
    const { meals,loading } = this.props.meals
    const mealAddedForDay = Object.values(meals).find((meal) => moment(meal.mealDate).format("MM-DD-YYYY") == moment(new Date()).format("MM-DD-YYYY"))
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <p className="lead text-muted">Welcome {userName}</p>
              <div className="loader">
              { loading && <Spinner />}
              </div>
              {
                mealAddedForDay ? undefined :
                  <AddMeal userId={userId} />
              }
              <MyMeals mealsData={meals} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  meals: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  meals: state.meals
});

export default connect(mapStateToProps, {clearUserMeal, getCurrentProfile, getUserProfile })(
  Dashboard
);
