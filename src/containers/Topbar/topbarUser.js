import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';
import IntlMessages from '../../components/utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';
import { withRouter } from 'react-router-dom';
import actions from '../../redux/masterdetails/actions';

import {
  IconButtons,
  TopbarDropdown,
  UserInformation,
  SettingsList,
  Icon,
} from './topbarDropdown.style';
import authAction from '../../redux/auth/actions';
import Image from '../../images/user.jpg';

const { logout } = authAction;

const { loadUserSettings } = actions;

const theme = createMuiTheme({
  overrides: {
    MuiModal: {
      root: {
        zIndex: 1800,
      },
    },
    MuiPopover: {
      paper: {
        maxWidth: 290,
      },
    },
  },
});

class TopbarUser extends Component {
  state = {
    visible: false,
    anchorEl: null,
  };
  componentDidMount() {
    this.props.loadUserSettings();
  }
  hide = () => {
    this.setState({ visible: false });
  };
  handleVisibleChange = () => {
    this.setState({
      visible: !this.state.visible,
      anchorEl: findDOMNode(this.button),
    });
  };
  componentWillReceiveProps = (props) => {
    console.log("Top Bar", props);
    if (props.profile && props.profile.user) {
      this.setState({userName: props.profile.user.user_fname + " " + props.profile.user.user_lname, image:"/api/user/" + props.profile.user.user_id})
    }
  }
  render() {
    const content = (
      <TopbarDropdown>
        <UserInformation>
          <div className="userImage">
            <img src={this.state.image} alt="user" />
          </div>

          <div className="userDetails">
            <h3>{this.state.userName}</h3>
            <p>Dynapreneur</p>
          </div>
        </UserInformation>

        <SettingsList>
          <a href="#!" className="dropdownLink" onClick={()=>{this.props.history.push('/dashboard/user-settings')}}>
            <Icon>settings</Icon>
            <IntlMessages id="themeSwitcher.settings" />
          </a>
          <a href="#!" className="dropdownLink">
            <Icon>help</Icon>
            <IntlMessages id="sidebar.feedback" />
          </a>
          <a href="#!" className="dropdownLink">
            <Icon>feedback</Icon>
            <IntlMessages id="topbar.help" />
          </a>
          <a href="#!" onClick={this.props.logout} className="dropdownLink">
            <Icon>input</Icon>
            <IntlMessages id="topbar.logout" />
          </a>
        </SettingsList>
      </TopbarDropdown>
    );
    return (
      <div id="topbarUserIcon">
        <IconButtons
          ref={node => {
            this.button = node;
          }}
          onClick={this.handleVisibleChange}
        >
          <div className="userImgWrapper">
            <img src={this.state.image} alt="#" />
          </div>
        </IconButtons>

        <MuiThemeProvider theme={theme}>
          <TopbarDropdownWrapper
            open={this.state.visible}
            anchorEl={this.state.anchorEl}
            onClose={this.hide}
            // marginThreshold={66}
            className="userPopover"
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'bottom',
            }}
          >
            {content}
          </TopbarDropdownWrapper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    ...state.App,    
		...state.MasterDetailsReducer,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
  }),
  { logout, loadUserSettings }
)(TopbarUser));
