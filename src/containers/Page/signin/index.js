import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import signinImg from "../../../images/signup.svg";
import fbBtnSvg from "../../../images/facebook-app-symbol.svg";
import gpBtnSvg from "../../../images/google-plus.svg";
import authBtnSvg from "../../../images/auth0.svg";
import Button from "../../../components/uielements/button";
import authAction from "../../../redux/auth/actions";
import TextField from "../../../components/uielements/textfield";
import IntlMessages from "../../../components/utility/intlMessages";
import Scrollbars from "../../../components/utility/customScrollBar";
import SignInStyleWrapper from "./signin.style";
import Auth0 from "../../../helpers/auth0";
import Firebase from "../../../helpers/firebase";
import FirebaseLogin from "../../../components/firebase";

const { login } = authAction;
class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    username: "demo@gmail.com",
    password: "demodemo"
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
    const { login } = this.props;
    const { username, password } = this.state;
    login({ username, password });
    this.props.history.push("/dashboard");
  };
  onChangeUsername = event => this.setState({ username: event.target.value });
  onChangePassword = event => this.setState({ password: event.target.value });
  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer, username, password } = this.state;

    if (redirectToReferrer) {
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
            </Link>
          </div>
          <Scrollbars style={{ height: "100%" }}>
            <div className="mateSignInPageGreet">
              <p style={{"textAlign":"center"}}>
                <img src={"/dyna-logo.png"} alt="Logo" />
              </p>
              <p>
                Welcome to TM Dynapreneur 2018, Please Login with your personal account
                information.
              </p>
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
                * Username: demo@gmail.com , Password: demodemo or click on any
                button.
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
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login }
)(SignIn);
