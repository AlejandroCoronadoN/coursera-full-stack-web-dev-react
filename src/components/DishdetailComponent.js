import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
  Row, 
  Label,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";



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
    console.log("Current state: " + JSON.stringify(values));
    alert("Current state: " +JSON.stringify(values));

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
      <CommentForm></CommentForm>
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