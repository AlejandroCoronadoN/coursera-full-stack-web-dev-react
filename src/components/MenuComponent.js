import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import {Loading} from './LoadingComponent';

function RenderMenuItem ({dish, onClick}) {
  return (
      <Card>
          <Link to={`/menu/${dish.id}`} >
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                  <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
          </Link>
      </Card>
  );
}
//? Whenever you create a list of items in react each item requires an ID
//? Each Media REACT item will work as a lielement (elementy from list) this is how it works by documentation
//? Noite that this Media list component continues inside the definition of menu that contains Media body Media li etc...
//? Stores properties related to this component that we can use

const Menu = (props) => {
  const menu = props.dishes.dishes.map((dish) => {
    //? Note that we dont need any longer this.props since there is no object in thes component
    return (
      <div key={dish.id} class="col-12 col-md-5">
        <RenderMenuItem dish={dish}></RenderMenuItem>
      </div>
    );
  });

  if (props.dishes.isLoading){
    return(
      <div class="container">
        <div class="row">
          <Loading></Loading>
        </div>
      </div>
    )
  }
  else if (props.dishes.errMess){
    return(
      <div class="container">
        <div class="row">
          <h4>{props.dishes.errMess}</h4>
        </div>
      </div>
    )
  }
  else
    return (
      <div class="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3 className="">Menu</h3>
            <hr/>
          </div>
        </div>
        <div class="row">{menu}</div>
      </div>
    );
};

export default Menu;
