import React from 'react';
import {Card, CardImg, CardImgOverlay,CardTitle} from 'reactstrap';

  function RenderMenuItem({dish, onClick}){ //? Specify props individually it could also be props
    return(
      <Card onClick={()=> onClick(dish.id) }> 
      <CardImg widht='100%' src={dish.image} alt={dish.name}/>
      <CardImgOverlay body className="ml-5">
        <CardTitle heading>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>    );
  }
  //? Whenever you create a list of items in react each item requires an ID
  //? Each Media REACT item will work as a lielement (elementy from list) this is how it works by documentation
  //? Noite that this Media list component continues inside the definition of menu that contains Media body Media li etc...
  //? Stores properties related to this component that we can use

  const Menu = (props) => {
    const menu= props.dishes.map((dish) => { //? Note that we dont need any longer this.props since there is no object in thes component
      return (
        <div key={dish.id} class="col-12 col-md-5">
            <RenderMenuItem dish={dish} onClick={props.onClick}></RenderMenuItem>
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

export default Menu;

