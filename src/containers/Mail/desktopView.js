import React from 'react';
import { connect } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import Scrollbars from '../../components/utility/customScrollBar';
import MailList from '../../components/mail/mailList';
import mailBuckets, {
  buckets,
  bucketColor,
} from '../../components/mail/mailBucket';
import mailTags from '../../components/mail/mailTags';
import Divider from '../../components/uielements/dividers';
import BulkMailActions from '../../components/mail/bulkMailActions';
import mailActions from '../../redux/mail/actions';
import mailSelector from '../../redux/mail/selector';
import MailBox, {
  Navigations,
  MailListBox,
  MailActionBar,
  Icon,
  InputAdornment,
  InputSearch,
  FormControl,
} from './mailBox.style';

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      root: {
        zIndex: 1500,
      },
      paperWidthSm: {
        maxWidth: '80vw',
        width: '100%',
      },
    },
  },
});

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
    allMails,
    searchString,
    filterAttr,
    filterMails,
    composeMail,
    filterAction,
    changeComposeMail,
    changeSearchString,
    checkedMails,
    scrollHeight,
  } = props;
  let BColor = getBucketColor(filterAttr);
  const hideSearchbar = countCheckMailed(checkedMails) === 0;
  return (
    <MailBox style={{ height: scrollHeight }}>
      <Navigations>
        <Scrollbars style={{ height: props.height - 70 }}>
          {mailBuckets(allMails, filterAction, filterAttr)}
          <Divider />
          {mailTags(allMails, filterAction, filterAttr)}
        </Scrollbars>
      </Navigations>
      <MailListBox>
        <MailActionBar style={{ backgroundColor: BColor }}>
          <BulkMailActions {...props} />
          <FormControl style={{ display: hideSearchbar ? '' : 'none' }}>
            <InputSearch
              id="emailSearch"
              alwaysDefaultValue
              className="mailSearch"
              placeholder="Search"
              defaultValue={searchString}
              onChange={changeSearchString}
              disableUnderline={true}
              startAdornment={
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              }
            />
          </FormControl>
        </MailActionBar>
        <Scrollbars style={{ height: props.height - 180 }}>
          <MailList
            {...props}
            mails={filterMails}
            selectedBucket={BColor}
            hideSearchbar={hideSearchbar}
          />
        </Scrollbars>
      </MailListBox>
    </MailBox>
  );
};

function mapStateToProps(state) {
  return {
    ...state.Mails,
    filterMails: mailSelector(state.Mails),
    scrollHeight: state.App.scrollHeight,
  };
}

export { getBucketColor };
export default connect(
  mapStateToProps,
  {
    ...mailActions,
  }
)(DesktopView);
