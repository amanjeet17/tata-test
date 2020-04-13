import React, { Component } from 'react';
import InputGroup from '../common/InputGroup';
import { updateMeal,deleteMeal }from '../../actions/mealActions';
import { connect } from 'react-redux';

class MealCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            calorie: '',
            editState: false,
            _id: null,
            dayId:null
        }
    }
    static getDerivedStateFromProps(nextProps, prevstate) {
        const { _id, name, calorie } = nextProps.meal;
        const dayId = nextProps.dayId
        if (name !== prevstate.name) {
            return { name: name, calorie: calorie, _id: _id ,dayId:dayId}
        }
        else {
            return null
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({editState:false})
        const data = {
            _id: this.state._id,
            name: this.state.name,
            calorie: this.state.calorie,
            dayId:this.state.dayId
        }

        this.props.updateMeal(data)


    }

    editMeal = (e) => {
        this.setState({ editState: true })
    }

    deleteMeal = (e) =>{
        const data = {
            mealId: this.state._id,
            dayId:this.state.dayId
        }
        this.props.deleteMeal(data)
    }

    render() {
        const { name, calorie, editState } = this.state
        let details

        if (editState === true) {
            details = (
                <form onSubmit={this.onSubmit}>
                    <InputGroup
                        placeholder="Meal Name"
                        name="name"
                        value={name}
                        onChange={this.onChange}
                        type="text"
                    />
                    <InputGroup
                        placeholder="calorie"
                        name="calorie"
                        value={calorie}
                        onChange={this.onChange}
                        type="number"
                    />
                    <button
                        type="submit"
                        className="btn btn-info btn-block mt-4"
                        disabled={(name === "" || calorie === "")}
                    >Save meal</button>
                </form>)
        }
        else {
            details = (<div>
                <div>
                    <ul>
                        <li>Name:{this.state.name}</li>
                        <li>Calories : {this.state.calorie}</li>
                    </ul>
                </div>
                <div>
                    <button type="button" onClick={this.editMeal}>Edit</button>
                    <button type="button" onClick={this.deleteMeal} >Delete</button>
                </div>

            </div>)
        }


        return (
            <div className="col-xs-3">
            <div className='card food-card'>
                <div className='card-body'>
                    {details}
                </div>
            </div>
            </div>
        )
    }
}

export default connect(null, {updateMeal,deleteMeal})(MealCard);