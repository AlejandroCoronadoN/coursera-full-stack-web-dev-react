import React, { Component } from "react";
import Home from './HomeComponent';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
class Main extends Component {
  /*? App is called  by index.html as part of the DOM*/


  constructor(props){
    super('props');
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }
  

  //? Note that while using Route we need to pass the Menu component as JS function in order to pass props to the component.
  //? Everything that doesnt match the route will be redirected to home
  render() {
    const HomePage = () =>{
      return(
        <Home></Home>
      );
    }
    return (
      <div>
        <Header></Header>
          <Switch>
            <Route path='/home' component={HomePage}>Home</Route> 
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes}/>}></Route> 
            <Redirect to='/home'></Redirect>        
          </Switch>
        <Footer></Footer>

      </div>
    );
  }
}

export default Main;
