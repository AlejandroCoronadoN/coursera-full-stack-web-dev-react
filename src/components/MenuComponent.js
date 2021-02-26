import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay,CardTitle} from 'reactstrap';
import Dishdetail from './DishdetailComponent';
class Menu extends Component{

  constructor(props) {
    super(props);
  }

  
  //? Whenever you create a list of items in react each item requires an ID
  //? Each Media REACT item will work as a lielement (elementy from list) this is how it works by documentation
  //? Noite that this Media list component continues inside the definition of menu that contains Media body Media li etc...
  //? Stores properties related to this component that we can use

  render(){
    const menu= this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} class="col-12 col-md-5 m-1">
          <Card onClick={()=> this.props.onClick(dish.id) }> 
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
      </div>
    );

  }
};

export default Menu;

