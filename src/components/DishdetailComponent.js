import React, {Component} from 'react';
import {Media} from 'reactstrap';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
class Dishdetail extends Component{
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  renderComments(comments){
    const menucomment =comments.map((comment) => {
      return (
        <li class="list-unstyled">
          <p> {comment.comment}</p>
          <p>-- {comment.author}, {comment.date}</p>

        </li>        

        );
      });

    return (
      <div className="col-12 col-md-5 m-1">
        <b>Comments</b>
        <ul className="list-unstyled">
          {menucomment}
        </ul>
      </div>
      );
    
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
          {this.renderComments(dish.comments)}
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
          {this.renderDish(this.props.selectedDish)}
      </div>
    );
  }
};

export default Dishdetail;