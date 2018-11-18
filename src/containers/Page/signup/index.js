import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import signinImg from "../../../images/signin.svg";
import TextField from "../../../components/uielements/textfield";
import Scrollbars from "../../../components/utility/customScrollBar";
import Button from "../../../components/uielements/button";
import authAction from "../../../redux/auth/actions";
import IntlMessages from "../../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import { Checkbox } from "./signup.style";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';

const { login, register } = authAction;

class SignUp extends Component {
  state = {
    redirectToReferrer: false,
    register: {
      user_name: "",
      user_password: "",
      user_fname: "",
      user_lname: "",
      authKey: "",
      confirmPassword: ""
    },
    validate: false,
    open: false,
    success: false,
    error: "",
    message: "",
  };
  componentWillReceiveProps(nextProps) {
    console.log("Properties Changed", nextProps);
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }

    if (nextProps.success === true) {
      alert("User has been created successfully, please login");
      this.props.history.push("/signin");
    }
    else if (nextProps.error && !this.shownError) {
      this.shownError = true;
      // alert("An error occurred trying to create the user, please check the details and try again");
      this.setState({ error: nextProps.error, open: true });
      return;
    }
  }
  handleLogin = () => {
    this.shownError = false;
    const { register } = this.props;
    // validate then submit?
    let valid = true;

    Object.keys(this.state.register).forEach(e => {
      if (this.state.register[e] === "") valid = false;
    });

    if (!valid) {
      this.setState({ validate: true });
      return;
    }

    register(this.state.register); // i need the payload ...
    // this.props.history.push("/dashboard");
  };
  handleClose = () => {
    this.setState({ open: false });
  }
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
            <Link to="#">
              <button className="mateSignInPageLinkBtn" type="button" onClick={() => { this.props.history.push("/signin"); }}>
                Login
              </button>
              <button className="mateSignInPageLinkBtn active" type="button" onClick={() => { this.props.history.push("/signup"); }}>
                Sign Up
              </button>
              <button className="mateSignInPageLinkBtn" type="button" onClick={() => { this.props.history.push("/resetpass"); }}>
                Reset Password
              </button>
            </Link>
          </div>
          <Scrollbars style={{ height: "100%" }}>
            <p style={{ "textAlign": "center" }}>
              <img src={"/dyna-logo2.png"} alt="Logo" />
            </p>
            <p>
              Welcome to TM Dynapreneur 2018, This is the registration page. Only authorized users may use this
              </p>
            <p class="hasError">
              {this.state.error ? <SnackbarContent message={"Failed to create User - Please check configuration and try again"} /> : ""}
            </p>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={this.state.open}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Failed to create the User; please check your settings and try again</span>}
            />
            <div className="mateSignInPageForm">
              <div className="mateInputWrapper">
                <TextField
                  name="user_name"
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  onChange={this.changedValue}
                  value={this.state.register.user_name}
                  error={this.state.validate && this.state.register.user_name === ""}
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
                  error={this.state.validate && this.state.register.user_fname === ""}
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
                  error={this.state.validate && this.state.register.user_lname === ""}
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
                  error={this.state.validate && this.state.register.user_password === ""}
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
                  error={this.state.validate && this.state.register.authKey === ""}
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
                  error={this.state.validate && this.state.register.confirmPassword !== this.state.register.user_password}
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
    success: state.Auth.success,
    message: state.Auth.message,
    error: state.Auth.error
  }),
  { login, register }
)(SignUp);
