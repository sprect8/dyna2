import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Button from '../../../components/uielements/button';
import IntlMessages from '../../../components/utility/intlMessages';
import signinImg from '../../../images/signup.svg';
import TextField from '../../../components/uielements/textfield';
import SignInStyleWrapper from './resetPassword.style';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import { Row, HalfColumn, FullColumn } from '../../../components/utility/rowColumn';
import authAction from "../../../redux/auth/actions";
import { connect } from "react-redux";

const { resetPassword } = authAction;

class ResetPassword extends Component {
  state = {
    redirectToReferrer: false,
    register: {
      user_name: "",
      user_password: "",
      authKey: "",
      confirmPassword: ""
    },
    validate: false,
    open: false,
    success: false,
    error: "",
    message: "",
  };
  validateAndSubmit = () => {
    // confirm all details correct
    let register = this.state.register;
    let valid = register.user_name !== "";
    valid = valid && register.user_password === register.confirmPassword
    valid = valid && register.user_password !== "";
    valid = valid && register.authKey !== "";

    if (!valid) {
      this.setState({validate: true});
    }
    else {
      this.setState({validate: false});
      this.shownError = false;

      this.props.resetPassword(register);
    }
  }
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.success === true) {
      alert("User password reset successfully, please login");
      this.props.history.push("/signin");
    }
    else if (nextProps.error && !this.shownError) {
      this.shownError = true;
      alert("An error occurred trying to create the user, please check the details and try again");
      this.setState({ error: nextProps.error, open: true });
      return;
    }
  }
  render() {
    return (
      <SignInStyleWrapper className="mateSignInPage">
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
              <button className="mateSignInPageLinkBtn" type="button" onClick={() => { this.props.history.push("/signup"); }}>
                Sign Up
              </button>
              <button className="mateSignInPageLinkBtn active" type="button" onClick={() => { this.props.history.push("/resetpass"); }}>
                Reset Password
              </button>
            </Link>
          </div>
          <div className="mateSignInPageGreet">
            <p style={{ "textAlign": "center" }}>
              <img src={"/dyna-logo2.png"} alt="Logo" />
            </p>
            <p>
              Welcome to TM Dynapreneur 2018, This is the registration page. Only authorized users may use this
              </p>
            <p class="hasError">
              {this.state.error ? <SnackbarContent message={"Failed to create User - Please check configuration and try again"} /> : ""}
            </p>
          </div>
          <Row>
            <FullColumn>

              <div className="mateInputWrapper">
                <TextField error={this.state.validate && this.state.register.user_name === ""} fullWidth label="Enter Username" value={this.state.register.user_name} onChange={(e) => {let r = this.state.register; r.user_name = e.target.value; this.setState({register: r})}} margin="normal" />
              </div>
              <div className="mateInputWrapper">
                <TextField error={this.state.validate && this.state.register.authKey === ""} type="password" fullWidth label="Enter Dynapreneur Key" value={this.state.register.authKey} onChange={(e) => {let r = this.state.register; r.authKey = e.target.value; this.setState({register: r})}}  margin="normal" />
              </div>

              <div className="mateInputWrapper">
                <TextField error={this.state.validate && (this.state.register.user_password === "" || this.state.register.confirmPassword !== this.state.register.user_password)} type="password" fullWidth label="Enter new password" value={this.state.register.user_password} onChange={(e) => {let r = this.state.register; r.user_password = e.target.value; this.setState({register: r})}}  margin="normal" />
              </div>
              <div className="mateInputWrapper">
                <TextField error={this.state.validate && (this.state.register.confirmPassword === "" || this.state.register.confirmPassword !== this.state.register.user_password)} type="password" fullWidth label="Confirm password" value={this.state.register.confirmPassword} onChange={(e) => {let r = this.state.register; r.confirmPassword = e.target.value; this.setState({register: r})}}  margin="normal" />
              </div>

              <div className="mateLoginSubmit">
                <Button type="primary" onClick={this.validateAndSubmit}>
                  <IntlMessages id="page.resetPassSave" />
                </Button>
              </div>
            
            </FullColumn>
            
          </Row>

          <p className="homeRedirection">
            Or go back to{' '}
            <Link to="/dashboard">
              <Button color="primary">Homepage</Button>
            </Link>
          </p>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    success: state.Auth.success,
    message: state.Auth.message,
    error: state.Auth.error
  }),
  { resetPassword }
)(ResetPassword);
