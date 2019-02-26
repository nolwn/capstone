import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"

import { logOut } from "../actions/authentication";

const Header = props =>
  <div>
    <Navbar expand="md">
      <div className="container">
        <NavbarBrand><img src="/img/Logo.svg" height="40px" /></NavbarBrand>
        <NavbarToggler isOpen="true" />
        <Collapse className="ml-auto" navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>
                Welcome, {props.authentication.username}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer", color:"#3399ee" }}
                onClick={ e => {
                  props.logOut();
                  props.history.replace("/login");
                }
              }>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      </div>
    </Navbar>
  </div>

const mapStateToProps = ({ authentication }) => ({ authentication });
const mapDispatchToProps = dispatch => bindActionCreators({ logOut }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
