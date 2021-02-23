import React, {Component} from 'react';
import {Media} from 'reactstrap';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class Dishdetail extends Component{
  constructor(props) {
    super(props);

    this.state = {
    }
  }


  renderDish(dish){
    if (dish != null){
      return(
        <div className='row'>
          <Card className="col-12 col-md-5 m-1">
            <CardImg widht='100%' src={dish.image} alt={dish.name}/>
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>





          
          <Card className="col-12 col-md-5 m-1">
            <CardImg widht='100%' src={dish.image} alt={dish.name}/>
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
      </div>
      );
    }
    else{
      return(
        <div> </div>
      );
    }
  }

  render(){

    return(
      <div class="container">
        <div class="row">
            {this.props.menu}
        </div>
        <div className="row">
          {this.renderDish(this.props.selectedDish)}
        </div>
      </div>
    );

  
  }
};

export default Dishdetail;