import * as ActionTypes from './ActionTypes';

export const Promotions = (state =  {
    isLoading: true,
    errMess: null,
    promotions: []
  }, action) => {
  switch (action.type){

    case ActionTypes.ADD_PROMOS:
      return {...state, isLoading: false, errMess:null, promotions:action.payload};      
    case ActionTypes.PROMOS_LOADING:
      return {...state, isLoading: true, errMess:null, promotions:[]};
      ///...state creates a copy of the previous state and add some modifications cratinga new object
    case ActionTypes.PROMOS_FAILED:
      return {...state, isLoading: false, errMess:action.payload, promotions:[]} 

    default: 
      return state;
      
  }
}