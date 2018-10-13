import React from 'react';
import { connect } from 'react-redux';
import ReactDrawer from 'react-motion-drawer';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Scrollbars from '../../components/utility/customScrollBar';
import Dialog from '../../components/uielements/dialogs';
import MailList from '../../components/mail/mailList';
import mailBuckets, {
  buckets,
  bucketColor,
} from '../../components/mail/mailBucket';
import mailTags from '../../components/mail/mailTags';
import Divider from '../../components/uielements/dividers';
import ComposeBtn from '../../components/mail/mailComposeBtn';
import ComposeMail from '../../components/mail/composeMail';
import BulkMailActions from '../../components/mail/bulkMailActions';
import mailActions from '../../redux/mail/actions';
import mailSelector from '../../redux/mail/selector';
import MailBox, {
  Navigations,
  MailListBox,
  MailActionBar,
  MailActionDefaultView,
  Icon,
  IconButton,
  SearchIcon,
  InputSearch,
  FormControl,
  ComposeModalHeader,
  ComposeModalActionBtns,
  BackbtnWrapper,
} from './mailBox.style';

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      root: {
        zIndex: 1500,
      },
      paperWidthSm: {
        maxWidth: '90vw',
        width: '100%',
      },
    },
  },
});

const bucketStyle = {
  boxShadow: '1px 0px 4px rgba(0, 0, 0, 0.3)',
  marginRight: 0,
  paddingRight: 0,
};

const getBucketColor = ({ bucket }) => {
  if (bucket) {
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i] === bucket) {
        return bucketColor[i];
      }
    }
  }
  return '#fff';
};
const countCheckMailed = checkedMails => {
  let count = 0;
  Object.keys(checkedMails).forEach(key => {
    if (checkedMails[key]) {
      count++;
    }
  });
  return count;
};
const DesktopView = props => {
  const {
    mobileSearchView,
    allMails,
    searchString,
    filterAttr,
    openDrawer,
    filterMails,
    composeMail,
    filterAction,
    changeComposeMail,
    changeSearchString,
    checkedMails,
    toggleOpenDrawer,
    toggleSearch,
  } = props;
  let BColor = getBucketColor(filterAttr);
  const labelName = filterAttr.tag || filterAttr.bucket;
  const hideSearchbar = countCheckMailed(checkedMails) === 0;
  const drawerProps = {
    overlayColor: 'rgba(0,0,0,0.75)',
    drawerStyle: bucketStyle,
  };
  return (
    <MailBox>
      <MuiThemeProvider theme={theme}>
        <Dialog
          open={composeMail}
          onClose={() => changeComposeMail(false)}
          disableBackdropClick
        >
          <ComposeModalHeader>
            <Icon>drafts</Icon>

            <ComposeModalActionBtns>
              <IconButton>
                <Icon>remove</Icon>
              </IconButton>

              <IconButton>
                <Icon>fullscreen_exit</Icon>
              </IconButton>

              <IconButton onClick={() => changeComposeMail(false)}>
                <Icon>close</Icon>
              </IconButton>
            </ComposeModalActionBtns>
          </ComposeModalHeader>
          <ComposeMail {...props} open={composeMail} />
        </Dialog>
      </MuiThemeProvider>
      <ReactDrawer
        {...drawerProps}
        open={openDrawer}
        left={true}
        onChange={value => {
          if (!value) {
            toggleOpenDrawer(false);
          }
        }}
      >
        <Navigations>
          <BackbtnWrapper>
            <IconButton onClick={() => toggleOpenDrawer(false)}>
              <Icon>keyboard_backspace</Icon>
            </IconButton>
          </BackbtnWrapper>
          <Scrollbars style={{ height: props.height - 55, paddingTop: 15 }}>
            {mailBuckets(allMails, filterAction, filterAttr)}
            <Divider />
            {mailTags(allMails, filterAction, filterAttr)}
          </Scrollbars>
        </Navigations>
      </ReactDrawer>

      <MailListBox>
        <MailActionBar style={{ backgroundColor: BColor }}>
          <BulkMailActions {...props} />

          <FormControl style={{ display: hideSearchbar ? '' : 'none' }}>
            <IconButton onClick={toggleSearch}>
              <Icon>arrow_back</Icon>
            </IconButton>
            <InputSearch
              id="emailSearch"
              alwaysDefaultValue
              className="mailSearch"
              placeholder="Search"
              defaultValue={searchString}
              onChange={changeSearchString}
              disableUnderline={true}
            />
          </FormControl>

          <MailActionDefaultView
            style={{
              display: mobileSearchView ? 'none' : hideSearchbar ? '' : 'none',
              backgroundColor: BColor,
            }}
          >
            <IconButton onClick={() => toggleOpenDrawer(true)}>
              <Icon>menu</Icon>
            </IconButton>

            <span className="cUrr3nt-bUck3T">{labelName}</span>

            <SearchIcon onClick={toggleSearch}>
              <Icon>search</Icon>
            </SearchIcon>
          </MailActionDefaultView>
        </MailActionBar>

        <Scrollbars style={{ height: props.height - 145 }}>
          <MailList
            {...props}
            mails={filterMails}
            selectedBucket={BColor}
            hideSearchbar={hideSearchbar}
          />
        </Scrollbars>
      </MailListBox>

      <ComposeBtn changeComposeMail={changeComposeMail} />
    </MailBox>
  );
};

function mapStateToProps(state) {
  return {
    ...state.Mails,
    filterMails: mailSelector(state.Mails),
  };
}

export { getBucketColor };
export default connect(
  mapStateToProps,
  {
    ...mailActions,
  }
)(DesktopView);
