import React from 'react';
import MealCard from './MealCard'
import AddMealCard from './AddMealCard';
import moment from 'moment';

const OneDayMeals = (props) => {
    const myStyle = {
        justifyContent: "space-evenly"
    }
    const { mealDate, _id } = props.oneDayData;
    let count=0;
    const calorieAgregator = (accumulator, currentValue) => accumulator+parseInt(currentValue.calorie);
    let Totalcalorie = props.oneDayData.meals.reduce(calorieAgregator,count);
    return (
        <React.Fragment>
            <div>
                <h2 className={Totalcalorie>2000 ?"red" :"green"}> Date : {moment(mealDate).format("MM-DD-YYYY")} <span>Totalcalorie : {Totalcalorie}</span></h2>
                <div className="row col-xs-12" style={myStyle}>
                    <div className="col-xs-3"><AddMealCard date={mealDate} id={_id} dayId={props.oneDayData._id} /></div>
                    {
                        props.oneDayData.meals.map((meal) => <MealCard meal={meal} date={mealDate} dayId={props.oneDayData._id} />)
                    }
                </div>
            </div>
            <hr />
        </React.Fragment>
    )
}

export default OneDayMeals;