import React, { Component } from "react";
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
class Main extends Component {
  /*? App is called  by index.html as part of the DOM*/
  constructor(props){
    super('props');
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }
  
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }


  render() {
    return (
      <div>
        <Header></Header>
        <Menu dishes = {this.state.dishes}
          onClick ={(dishId) => this.onDishSelect(dishId)} />
        <Dishdetail 
          dish={this.state.dishes.filter((dish)=> dish.id === this.state.selectedDish)[0]} /> 
        <Footer></Footer>

      </div>
    );
  }
}

export default Main;
