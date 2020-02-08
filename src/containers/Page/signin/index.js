import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import signinImg from "../../../images/signup.svg";
import Button from "../../../components/uielements/button";
import authAction from "../../../redux/auth/actions";
import TextField from "../../../components/uielements/textfield";
import Scrollbars from "../../../components/utility/customScrollBar";
import SignInStyleWrapper from "./signin.style";

import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';

const { login } = authAction;
class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    username: "",
    password: ""
  };
  componentWillReceiveProps(nextProps) {
    console.log("Next Props", nextProps);
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }

    if (nextProps.error) {
      this.setState({error: nextProps.error});
    }
  }
  handleLogin = () => {
    const { login } = this.props;
    const { username, password } = this.state;
    login({ username, password });
    // this.props.history.push("/dashboard");
  };
  onChangeUsername = event => this.setState({ username: event.target.value });
  onChangePassword = event => this.setState({ password: event.target.value });
  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer, username, password } = this.state;

    if (redirectToReferrer || this.props.isLoggedIn) {
      return <Redirect to={from} />;
    }
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
              <button className="mateSignInPageLinkBtn active" type="button">
                Login
              </button>
              <button className="mateSignInPageLinkBtn" type="button" onClick={()=>{    this.props.history.push("/signup");}}>
                Sign Up
              </button>
              <button className="mateSignInPageLinkBtn" type="button" onClick={()=>{    this.props.history.push("/resetpass");}}>
                Reset Password
              </button>
            </Link>
          </div>
          <Scrollbars style={{ height: "100%" }}>
            <div className="mateSignInPageGreet">
              <p style={{"textAlign":"center"}}>
                <img src={"/dyna-logo.png"} alt="Logo" />
              </p>
              <p>
                Welcome to DataLytics Platform, Please Login with your personal account
                information.
              </p>
              {this.state.error ? <SnackbarContent message={"Login Failed, please check username / password and try again"}  /> : ""}
              
            </div>
            <div className="mateSignInPageForm">
              <div className="mateInputWrapper">
                <TextField
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  type="Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="mateLoginSubmit">
                <Button type="primary" onClick={this.handleLogin}>
                  Login
                </Button>                
              </div>
            </div>
            <div className="mateLoginSubmitText">
              <span>
                Datalytics users can request a trial account from the relevant RZLytics representatives
              </span>
            </div>
            
          </Scrollbars>
        </div>
      </SignInStyleWrapper>
    );
  }
}
export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
    error: state.Auth.loginError
  }),
  { login }
)(SignIn);
