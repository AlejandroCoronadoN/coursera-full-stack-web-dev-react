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
import {addComment, fetchDishes} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state =>{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders  
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}, //Thunk 
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {
  /*? App is called  by index.html as part of the DOM*/


  constructor(props){
    super('props');
  }

  componentDidMount(){ //Lifecyclemethod -> this compoenent has been mounted into the component of my application -> fetch data
    this.props.fetchDishes();

  }
  
  //? Note that while using Route we need to pass the Menu component as JS function in order to pass props to the component.
  //? Everything that doesnt match the route will be redirected to home
  render() {
    const HomePage = () =>{
      return( //Now we hace this.props.dishes as an object with 3 components, one of those being dishes
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
              dishesLoading ={this.props.dishes.isLoading}
              dishesErrMess = {this.props.dishes.errMess}
              promotion = {this.props.promotions.filter((promo) => promo.featured)[0]}
              leader ={this.props.leaders.filter((leader) => leader.featured)[0]}></Home>
      );
    }

    const DishWithId = ({match}) => {
      return(
          <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading ={this.props.dishes.isLoading}
            errMess = {this.props.dishes.errMess}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            addComment ={this.props.addComment}/>
      );
    };

    return (
      <div>
        <Header></Header>
          <Switch>
            <Route path='/home' component={HomePage}>Home</Route> 
            <Route exact path='/menu' 
              component={() => <Menu dishes={this.props.dishes}/>}>
            </Route> 
            <Route path='/menu/:dishId' component={DishWithId}></Route>
            <Route exact path ='/contactus' 
              component ={() => <Contact resetFeedbackForm = {this.resetFeedbackForm}/>}></Route>
            <Route path ='/aboutus' 
              component ={() => <About leaders = {this.props.leaders}/>}></Route>
            <Redirect to='/home'></Redirect>        
          </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(Main));
//? connect allows mapStateToProps and mapDispatchToProps to become available in my Main component
