import React, { Component } from "react";
import Home from './HomeComponent';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import About from './AboutComponent';
class Main extends Component {
  /*? App is called  by index.html as part of the DOM*/


  constructor(props){
    super('props');

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }
  

  //? Note that while using Route we need to pass the Menu component as JS function in order to pass props to the component.
  //? Everything that doesnt match the route will be redirected to home
  render() {
    const HomePage = () =>{
      return(
        <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
              promotion = {this.state.promotions.filter((promo) => promo.featured)[0]}
              leader ={this.state.leaders.filter((leader) => leader.featured)[0]}></Home>
      );
    }

    const DishWithId = ({match}) => {
      return(
          <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    return (
      <div>
        <Header></Header>
          <Switch>
            <Route path='/home' component={HomePage}>Home</Route> 
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes}/>}></Route> 
            <Route path='/menu/:dishId' component={DishWithId}></Route>
            <Route exact path ='/contactus' component ={Contact}></Route>
            <Route path ='/aboutus' component ={() => <About leaders = {this.state.leaders}/>}></Route>
            <Redirect to='/home'></Redirect>        
          </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default Main;
