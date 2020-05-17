import React, { Component } from "react";
import { MDBNavbar,MDBBtn, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import socket from '../socket-con/config';

class NavbarPage extends Component {
  constructor() {
    super();
    this.state={
      label: 'Socket on',
      button: 'Close Socket',
      color_btn: 'aqua'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    isOpen: false
  };
  handleChange() {
    if (socket.connected){
      alert("Cerrando socket");
      this.setState({label: 'Socket OFF',button:'Start Socket',color_btn: "peach"})
      socket.close()}
    else{
      alert("Abriendo socket");
      this.setState({label: 'Socket ON',button:'Close Socket',color_btn: 'aqua'})
      socket.open()}
  }
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }



  render() {
    return (
      <Router>
        <MDBNavbar color="default-color" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">MarketExchange</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink className="waves-effect waves-light" to="#!">
                  <MDBBtn onClick={this.handleChange} gradient={this.state.color_btn}>{this.state.label}</MDBBtn>
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
      );
    }
  }

export default NavbarPage;