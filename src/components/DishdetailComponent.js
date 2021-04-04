import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {CardSubtitle, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
  Row, 
  Label,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import {Loading} from './LoadingComponent'; 
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => (!val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class CommentForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values){
    this.props.postComment(this.props.dishId, values.rating, values.firstname, values.message);
    
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }


  render(){
      return(
        <div>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-md"></span> Submit Comment
          </Button>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>

            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

            <Row className='form-group'>
              <Col md={12}>
              <Label htmlFor='firstname'  md={12}>Rating</Label>
                <Control.select model='.rating'
                  className ='form-control'
                  name='rating'>
                    <option>1 </option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>

                </Control.select>
              </Col>
            </Row>                  


            <Row className='form-group'>
              <Label htmlFor='firstname'  md={12}>Your Name</Label>
              <Col md={12}>
                <Control.text
                      model = '.firstname'
                      className ='form-control' 
                      name="firstname" 
                      id="firstname" 
                      placeholder ='Your Name'
                      validators ={{
                        required, 
                        minLength: minLength(3),
                        maxLength: maxLength(15)
                      }}                      >
                </Control.text>

                <Errors 
                  className ='text-danger' 
                  model='.firstname'
                  show ='touched'
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characyers',
                    maxLength: 'Must be 15 characters or less'
                  }}>
                </Errors>
                
              </Col>
            </Row>


            <Row className='form-group'>
              <Label htmlFor='feedback'  md={12}>Comment</Label>
              <Col md={12}>
                <Control.textarea model=".message"
                    className = 'form-control' 
                    name="message" 
                    id="message" 
                    placeholder ='...'
                    rows="6"
                    //value = {this.state.message}
                    //onChange={this.handleInputChange}
                    postComment
                ></Control.textarea>


              </Col>
            </Row>

            <Row className='form-group'>
              <Col md={2}>
                <Button type = 'submit' color='primary'>
                  Submit
                </Button>
              </Col>
            </Row>

          </LocalForm>

          </ModalBody>
        </Modal>
      </div>

      );
  
  
    
  }
}


function RenderComments({ comments, postComment, dishId }) {
    console.log("comments: ", comments);

    const menucomment = comments.map((comment) => {
      return (
        <Fade in>
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
        </Fade>
      );
    });

    return (
      <div className="col-12 col-md-5">
        <b>Comments</b>
        <ul className="list-unstyled">
        <Stagger in>
          {menucomment}
        </Stagger>

        </ul>
      <CommentForm dishId ={dishId} postComment ={postComment}/>
      </div>
    );

}

function RenderDish({ dish }) {
  return (

    <FadeTransform
    in
    transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
    }}>
      <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
          </CardBody>
      </Card>
  </FadeTransform>
  );

}



const Dishdetail = (props) => {
  if (props.isLoading){
    return(
      <div class="container">
        <div class="row">
          <Loading></Loading>
        </div>
      </div>
    )
  }
  else if (props.errMess){
    return(
      <div class="container">
        <div class="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  }
  else if (props.dish != null) {
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
        <RenderComments comments={props.comments} 
          postComment={props.postComment}
          dishId={props.dish.id}/>
      </div>

    </div>
  );
  }else{
    return (<div></div>);
  }
};

export default Dishdetail;