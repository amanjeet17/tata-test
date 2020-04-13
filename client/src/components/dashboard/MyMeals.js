import React from 'react';
import OneDayMeal from './OneDayMeal';


const MyMeals = (props) => {
    let meals = Object.values(props.mealsData).sort(function(a,b){
        return new Date(b.mealDate) - new Date(a.meaDate);
      });
    return (
        meals.map((oneDayMeal) => <OneDayMeal oneDayData={oneDayMeal} />)
    )
}

export default MyMeals;