import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import signinImg from "../../../images/signin.svg";
import fbBtnSvg from "../../../images/facebook-app-symbol.svg";
import gpBtnSvg from "../../../images/google-plus.svg";
import authBtnSvg from "../../../images/auth0.svg";
import TextField from "../../../components/uielements/textfield";
import Scrollbars from "../../../components/utility/customScrollBar";
import Button from "../../../components/uielements/button";
import authAction from "../../../redux/auth/actions";
import IntlMessages from "../../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import Auth0 from "../../../helpers/auth0/index";
import Firebase from "../../../helpers/firebase";
import FirebaseLogin from "../../../components/firebase";
import { Checkbox } from "./signup.style";

const { login, register } = authAction;

class SignUp extends Component {
  state = {
    redirectToReferrer: false,
    register: {
      user_name:"",
      user_password: "",
      user_fname:"",
      user_lname:"",
      authKey: "",      
      confirmPassword: ""
    },
    validate: false,
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { register } = this.props;
    // validate then submit?
    let valid = true;

    Object.keys(this.state.register).forEach(e=>{
      if (this.state.register[e] === "") valid = false;
    });

    if (!valid) {
      this.setState({validating:true});
      return;
    }

    register(this.state.register); // i need the payload ...
    // this.props.history.push("/dashboard");
  };
  changedValue = (event) => {
    let st = this.state
    st.register[event.target.name] = event.target.value;
    this.setState(st);
  }
  render() {
    return (
      <SignUpStyleWrapper className="mateSignUpPage">
        <div className="mateSignInPageImgPart">
          <div className="mateSignInPageImg">
            <img src={signinImg} alt="Kiwi standing on oval" />
          </div>
        </div>

        <div className="mateSignInPageContent">
          <div className="mateSignInPageLink">
          </div>
          <Scrollbars style={{ height: "100%" }}>
              <p style={{"textAlign":"center"}}>
                <img src={"/dyna-logo2.png"} alt="Logo" />
              </p>
              <p>
                Welcome to TM Dynapreneur 2018, This is the registration page. Only authorized users may use this
              </p>
            <div className="mateSignInPageForm">
              <div className="mateInputWrapper">
                <TextField
                  name="user_name"
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  onChange={this.changedValue}
                  value={this.state.register.user_name}
                  error={this.state.validate && this.state.register.user_name !== ""}
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  name="user_fname"
                  label="First Name"
                  placeholder="First Name"
                  margin="normal"
                  type="text"
                  onChange={this.changedValue}
                  value={this.state.register.user_fname}
                  error={this.state.validate && this.state.register.user_fname !== ""}
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  name="user_lname"
                  label="Surname"
                  placeholder="Surname"
                  margin="normal"
                  type="text"
                  onChange={this.changedValue}
                  value={this.state.register.user_lname}
                  error={this.state.validate && this.state.register.user_lname !== ""}
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  name="user_password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  type="Password"
                  onChange={this.changedValue}
                  value={this.state.register.user_password}
                  error={this.state.validate && this.state.register.user_password !== ""}
                />
              </div>
              
              <div className="mateInputWrapper">
                <TextField
                  name="authKey"
                  label="Master Key"
                  placeholder="Master Key"
                  margin="normal"
                  type="Password"
                  onChange={this.changedValue}
                  value={this.state.register.authKey}
                  error={this.state.validate && this.state.register.authKey !== ""}     
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  margin="normal"
                  type="Password"             
                  onChange={this.changedValue}
                  value={this.state.register.confirmPassword}
                  error={this.state.validate && this.state.register.confirmPassword === this.state.register.user_password}     
                />
              </div>
            </div>
            <div className="mateAgreement">
              <div className="mateLoginSubmitCheck">
                <Checkbox color="primary" className="mateTermsCheck" />
                <span className="mateTermsText">
                  <IntlMessages id="page.signUpTermsConditions" />
                </span>
              </div>
              <div className="mateLoginSubmit">
                <Button type="primary" onClick={this.handleLogin}>
                  Sign Up
                </Button>
              </div>
            </div>
          </Scrollbars>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
    success: state.Auth.success,
    message: state.Auth.message,
  }),
  { login, register }
)(SignUp);
