import {
    GET_MY_MEAL,
    ADD_MEAL,
    ADD_NEW_DAY_MEAL,
    EDIT_MEAL,
    DELETE_MEAL,
    MEAL_LOADING,
    GET_ERRORS,
    DELETE_MEAL_HISTORY,
    CLEAR_USER_MEAL
} from './types';
import axios from 'axios';

export const addMeal = mealData => dispatch => {
    dispatch(setProfileLoading());
    axios
        .post('/api/meals/addMeal', mealData)
        .then(res => {
            if (mealData.dayId === undefined) {
                let data = res.data
                data.mealDate = new Date().toISOString()
                dispatch({
                    type: ADD_NEW_DAY_MEAL,
                    payload: data
                })
            }
            else {
                let data = res.data
                data.dayId = mealData.dayId
                dispatch({
                    type: ADD_MEAL,
                    payload: res.data
                })
            }
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: mealData
            })
        );
}


export const getUserProfile = (id) => dispatch =>{
    dispatch(setProfileLoading());
    let url ='/api/meals/user_meal_info/'+id
    axios.get(url)
    .then(res => {
        console.log("getUserProfile",res)
        let obj = {};
        res.data.forEach(elem => {
            obj[elem._id] = elem;
        })
        dispatch({
            type: GET_MY_MEAL,
            payload: obj
        })
    }
    )
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    );
}


// Get profile meals
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/meals/mydashboard')
        .then(res => {
            let obj = {};
            res.data.forEach(elem => {
                obj[elem._id] = elem;
            })
            dispatch({
                type: GET_MY_MEAL,
                payload: obj
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_MY_MEAL,
                payload: {}
            })
        );

};


// Profile loading
export const setProfileLoading = () => {
    return {
        type: MEAL_LOADING
    };
};

export const updateMeal = (updateData) => dispatch => {
    axios.post('/api/meals/editmeal', updateData)
        .then((res) => {
            dispatch({
                type: EDIT_MEAL,
                payload: updateData
            })
        })

};

export const deleteMeal = (deleteData) => dispatch => {
    dispatch(setProfileLoading());
    axios.delete('/api/meals/deletemeal/'+deleteData.mealId)
        .then((res) => {
            if (res.data.length > 0) {
                dispatch({
                    type: DELETE_MEAL,
                    payload: deleteData
                })
            }
            else {
                dispatch({
                    type: DELETE_MEAL_HISTORY,
                    payload: deleteData
                })
            }
        })

};

// Clear profile
export const clearUserMeal = () => {


    return {
        type: CLEAR_USER_MEAL
    };
};

