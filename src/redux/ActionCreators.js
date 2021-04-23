import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
//! Midifying and inserting elements


export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + 'comments', { //!Post opperation
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'  
  }) 
  .then(response => {
    if(response.ok){
      return response;
    }
    else{ //! First part handles errors when the response from the server is an error
      var error = new Error('Error: ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  }, 
  error => { //! Second part handles errors when you don't get ant response from the server
    var errmess = new Error(error.message);
    throw errmess;
  })
  .then((response) => response.json()) //? Convert the response into json
  .then((response) => dispatch(addComment(response))) //? Note that we are fetching all teh information again
  .catch(error =>  { 
    console.log('post comments', error.message); 
    alert('Your comment could not be posted\nError: '+error.message); 
  });  
}

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});


//!-------------------------------POST FEEDBACK
export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message, id) => (dispatch) => {
  
  const newFeedback = {
    firstname: firstname,
    lastname: lastname, 
    telnum: telnum, 
    email: email,
    agree: agree,     
    contactType: contactType, 
    message: message ,
    id: id
    
  }
  newFeedback.date = new Date().toISOString();

  return fetch(baseUrl + 'feedback', { //!Post opperation
    method: 'POST',
    body: JSON.stringify(newFeedback),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'  
  }) 
  .then(response => {
    if(response.ok){
      return response;
    }
    else{ //! First part handles errors when the response from the server is an error
      var error = new Error('Error: ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  }, 
  error => { //! Second part handles errors when you don't get ant response from the server
    var errmess = new Error(error.message);
    throw errmess;
  })
  .then((response) => response.json()) //? Convert the response into json
  .then((response) => dispatch(addFeedback(response))) //? Note that we are fetching all teh information again
  .catch(error =>  { 
    console.log('post feedback', error.message); 
    alert('Your feedback could not be posted\nError: '+error.message); 
  });  
}

export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback
});


//!----------------------------DISHES--------------------------------
export const fetchDishes = () => (dispatch) => {
  // fetchDishes is a thunk that is going to call dispatch on several times
  // example const add = (x, y) => x + y ::: const add = x => y => x + y
  // we could also use getstate or dispatch

  dispatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then(response => {
      if(response.ok){
        return response;
      }
      else{ //! First part handles errors when the response from the server is an error
        var error = new Error('Error: ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, 
    error => { //! Second part handles errors when you don't get ant response from the server
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then((response) => response.json()) //? Convert the response into json
    .then((response) => dispatch(addDishes(response)))
    .catch( error => dispatch(dishesFailed(error.message)));

  };

  
  export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
    //We are telling someone to wait for the dishes to be load
  });
  
  export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess,
  });
  
  export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
  });

  
//!----------------------------LEADERS--------------------------------
export const fetchLeaders = () => (dispatch) => {

  dispatch(leadersLoading(true));

  return fetch(baseUrl + "leaders")
    .then(response => {
      if(response.ok){
        return response;
      }
      else{ //! First part handles errors when the response from the server is an error
        var error = new Error('Error: ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, 
    error => { //! Second part handles errors when you don't get ant response from the server
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then((response) => response.json()) //? Convert the response into json
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch( error => dispatch(leadersFailed(error.message)));

  };

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
  //We are telling someone to wait for the dishes to be load
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});



//!------------------COMMENTS----------------------
export const fetchComments = () => (dispatch) => {

  return fetch(baseUrl + "comments")
    .then(response => {
      if(response.ok){
        return response;
      }
      else{ //! First part handles errors when the response from the server is an error
        var error = new Error('Error: ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, 
    error => { //! Second part handles errors when you don't get ant response from the server
      var errmess = new Error(error.message);
      throw errmess;
    })

    .then((response) => response.json()) //? Convert the response into json
    .then((comments) => dispatch(addComments(comments)))
    .catch( error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

//!----------------------------PROMOS--------------------------------
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return fetch(baseUrl + "promotions")
    .then(response => {
      if(response.ok){
        return response;
      }
      else{ //! First part handles errors when the response from the server is an error
        var error = new Error('Error: ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, 
    error => { //! Second part handles errors when you don't get ant response from the server
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then((response) => response.json()) //? Convert the response into json
    .then((promos) => dispatch(addPromos(promos)))
    .catch( error => dispatch(promosFailed(error.message)));

};


export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
  //We are telling someone to wait for the dishes to be load
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});
