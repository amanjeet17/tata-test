import React, { Component } from 'react';
import InputGroup from '../common/InputGroup';
import {addMeal} from '../../actions/mealActions';
import { connect } from 'react-redux';

class AddMeal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            calorie:'',
            dayId:undefined,
            userId:undefined
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevstate) {
        const dayId=nextProps.dayId
        const userId = nextProps.userId
        if (prevstate.dayId !== dayId ) {
            return { dayId:dayId}
        }
        else if(prevstate.userId !== userId){
            return { userId:userId}
        }
        else {
            return null
        }
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const data = {
            name: this.state.name,
            calorie: this.state.calorie,
            dayId:this.state.dayId,
            userId:this.state.userId
        }
        this.setState({name:'',calorie:''})
        this.props.addMeal(data)
    }

    render() {
        const { name, calorie } = this.state;
        return (
            <React.Fragment>
                <div className='card'>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <InputGroup
                                placeholder="mealName"
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
                                disabled={(name==="" || calorie==="")}
                            >Add meal</button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(null, { addMeal })(AddMeal);