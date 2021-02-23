import React, {Component} from 'react';
import {Media} from 'reactstrap';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import Dishdetail from './DishdetailComponent';
class Menu extends Component{
  constructor(props) {
    super(props);

    this.state = {
        selectedDish: null
    }
}

onDishSelect(dish) {
    this.setState({ selectedDish: dish});
}

  
  //? Whenever you create a list of items in react each item requires an ID
  //? Each Media REACT item will work as a lielement (elementy from list) this is how it works by documentation
  //? Noite that this Media list component continues inside the definition of menu that contains Media body Media li etc...
  //? Stores properties related to this component that we can use

  render(){
    const menu= this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} class="col-12 col-md-5 m-1">
          <Card onClick ={() => this.onDishSelect(dish) } > 
            <CardImg widht='100%' src={dish.image} alt={dish.name}/>
            <CardImgOverlay body className="ml-5">
              <CardTitle heading>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
        );
    });

    return(
      <div class="container">
        <div class="row">
            {menu}
        </div>
        <Dishdetail selectedDish = {this.state.selectedDish}/>
      </div>
    );

  
  }
};

export default Menu;

