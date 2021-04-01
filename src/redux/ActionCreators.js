import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = ()=> (dispatch) => {
  // fetchDishes is a thunk that is going to call dispatch on several times 
  // example const add = (x, y) => x + y ::: const add = x => y => x + y
  // we could also use getstate or dispatch

  dispatch(dishesLoading(true));

  setTimeout(() => {
    dispatch(addDishes(DISHES))
  }, 2000 );

}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
  //We are telling someone to wait for the dishes to be load
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});