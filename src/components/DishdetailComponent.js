import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import {Link} from 'react-router-dom';

function RenderComments({ comments }) {
    console.log("comments: ", comments);
    const menucomment = comments.map((comment) => {
      return (
        <li class="list-unstyled">
          <p> {comment.comment}</p>
          <p>
            -- {comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              dat: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </li>
      );
    });

    return (
      <div className="col-12 col-md-5">
        <b>Comments</b>
        <ul className="list-unstyled">{menucomment}</ul>
      </div>
    );

}

function RenderDish({ dish }) {
  console.log("DISH renderDish: ", dish);
    return (
        <Card className="col-12 col-md-5">
          <CardImg widht="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
    );

}

const Dishdetail = (props) => {
  if (props.dish != null) {
  return (
    <div class="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3 className="">{props.dish.name}</h3>
          <hr/>
        </div>
      </div>
      
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.comments} />
      </div>
    </div>
  );
  }else{
    return (<div></div>);
  }
};

export default Dishdetail;
