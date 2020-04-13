import {
    GET_MY_MEAL,
    ADD_MEAL,
    EDIT_MEAL,
    DELETE_MEAL,
    MEAL_LOADING,
    ADD_NEW_DAY_MEAL,
    DELETE_MEAL_HISTORY,
    CLEAR_USER_MEAL
} from '../actions/types';

const initialState = {
    meals: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MEAL_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_MY_MEAL:
            return {
                ...state,
                meals: action.payload,
                loading: false
            };
        case ADD_MEAL:
            const { name, calorie, _id, dayId } = action.payload
            return {
                ...state,
                meals: {
                    ...state.meals,
                    [dayId]: {
                        ...state.meals[dayId],
                        meals: [{ _id, name, calorie }].concat(state.meals[dayId].meals)
                    }

                },
                loading: false
            }
        case ADD_NEW_DAY_MEAL:
            return {
                ...state,
                meals: {
                    ...state.meals,
                    [action.payload._id]: action.payload

                },
                loading: false
            }


        case EDIT_MEAL:
            const { dayId: DayID, _id: id, name: _name, calorie: _calorie } = action.payload
            return {
                ...state,
                meals: {
                    ...state.meals,
                    [DayID]: {
                        ...state.meals[DayID],
                        meals: state.meals[DayID].meals.map((meal) => {
                            if (meal._id === id) {
                                meal.name = _name
                                meal.calorie = _calorie
                            }
                            return meal
                        })

                    }
                },
                loading: false
            }

        case DELETE_MEAL:
            const { dayId: __dayID ,mealId} = action.payload
            return {
                ...state,
                meals: {
                    ...state.meals,
                    [__dayID]: {
                        ...state.meals[__dayID],
                        meals:state.meals[__dayID].meals.filter((el)=> el._id !==mealId)

                    }
                },
                loading: false
            }

        case DELETE_MEAL_HISTORY:
            const { dayId: _dayID } = action.payload;
            let newState = { ...state.meals }
            delete newState[_dayID]
            return {
                ...state,
                meals: newState,
                loading: false
            }

        case CLEAR_USER_MEAL:
            return {
                ...state,
                meals: {}
            };

        default:
            return state;
    }
}
