import React, { Component } from "react";
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {connect} from 'react-redux';
import {postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStateToProps = state =>{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders  
  }
}

const mapDispatchToProps = dispatch => ({
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback( firstname, lastname, telnum, email, agree, contactType, message)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}, //Thunk  
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},

  fetchComments: () => {dispatch(fetchComments())}, //Thunk 
  fetchPromos: () => {dispatch(fetchPromos())}, //Thunk 
  fetchLeaders: () => {dispatch(fetchLeaders())},


});

class Main extends Component {
  /*? App is called  by index.html as part of the DOM*/


  constructor(props){
    super('props');
  }

   componentDidMount(){ //Lifecyclemethod -> this compoenent has been mounted into the component of my application -> fetch data
     this.props.fetchDishes();
     this.props.fetchComments();
     this.props.fetchPromos();
     this.props.fetchLeaders();
  } 
  
  //? Note that while using Route we need to pass the Menu component as JS function in order to pass props to the component.
  //? Everything that doesnt match the route will be redirected to home
  render() {
    const HomePage = () =>{
      {console.log("Props.dishes: " + this.props.dishes)};
      const propstest = this.props;
      return( //Now we hace this.props.dishes as an object with 3 components, one of those being dishes
                <Home 

              dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
              dishesLoading ={this.props.dishes.isLoading}
              dishesErrMess= {this.props.dishes.errMess}
              
              promotion = {this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promosLoading ={this.props.promotions.isLoading}
              promosErrMess = {this.props.promotions.errMess}
            
              leader ={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading ={this.props.leaders.isLoading}
              leadersErrMess = {this.props.leaders.errMess}

        ></Home>
      );
    }

    const DishWithId = ({match}) => {
      {console.log("DishWithId Props.dishes: " + this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0])}

      return(

          <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading ={this.props.dishes.isLoading}
            errMess = {this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            postComment ={this.props.postComment}
            commentsErrMess = {this.props.comments.errMess}/>

      );
    };

    return (
      <div> 
        <Header/>
        <TransitionGroup>
          <CSSTransition key ={this.props.location.key} classNames ='page' timeout={3000}>
            <Switch>
              <Route path='/home' component= {HomePage}>Home</Route> 
              
              <Route exact path='/menu' 
                component={() => <Menu dishes={this.props.dishes}/>}>
              </Route> 
              <Route path='/menu/:dishId' component={DishWithId}></Route>
              <Route exact path ='/contactus' 
                component ={() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm} postFeedback = {this.props.postFeedback}/>}></Route>
              <Route path ='/aboutus' 
                component ={() => <About leaders = {this.props.leaders}/>}></Route>
              <Redirect to='/home'></Redirect>        
            </Switch>
            </CSSTransition>
        </TransitionGroup>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(Main));
//? connect allows mapStateToProps and mapDispatchToProps to become available in my Main component
