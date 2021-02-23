import React, { Component } from "react";
import {Navbar, NavbarBrand} from 'reactstrap';
import { ConfigureStore } from "./redux/configureStore";
import Menu from './components/MenuComponent';
import {DISHES} from './shared/dishes';
import "./App.css";

const store = ConfigureStore();

class App extends Component {
  /*? App is called  by index.html as part of the DOM*/
  constructor(props){
    super('props');
    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return (
      <div>
        <Navbar dark color='primary'>
          <div className="container">
            <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes = {this.state.dishes}/>
      </div>
    );
  }
}

export default App;
