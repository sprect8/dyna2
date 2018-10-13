import styled from 'styled-components';
import { palette } from 'styled-theme';
import { FormControl as FormControls } from '../../components/uielements/form';
import { InputLabel as InputLabels } from '../../components/uielements/input';
import { InputAdornment as InputAdornments } from '../../components/uielements/input';
import InputSearches from '../../components/uielements/inputSearch';
import WithDirection from '../../settings/withDirection';
import Icons from '../../components/uielements/icon';
import IconButtons from '../../components/uielements/iconbutton';
import ComposeMails from '../../components/mail/composeMail';

const InputLabel = styled(InputLabels)``;
const InputAdornment = styled(InputAdornments)``;
const InputSearch = styled(InputSearches)``;
const Icon = styled(Icons)``;
const IconButton = styled(IconButtons)`
  padding: 0;
`;

const BackbtnWrapper = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  background-color: #ffffff;
  align-items: center;
  margin-bottom: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
`;

const Navigations = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 270px;
  padding-right: 50px;

  @media only screen and (max-width: 1099px) {
    width: 100%;
    padding: 0;
    background-color: #fff;
  }
`;

const MailBox = styled.div`
  width: 100%;
  padding: 20px 30px;
  display: flex;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  @media only screen and (max-width: 1099px) {
    width: 100%;
    padding: 0;
  }
`;

const MailListBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const ComposeModalHeader = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  background-color: ${palette('grey', 8)};
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 10px;
  box-sizing: border-box;
  border-radius: 2px 2px 0 0;

  * {
    box-sizing: border-box;
  }

  ${Icon} {
    color: #ffffff;
    font-size: 18px;
  }
`;

const ComposeModalActionBtns = styled.div`
  display: inline-flex;
  align-items: center;

  ${IconButton} {
    width: 30px;
    height: 30px;

    ${Icon} {
      color: ${palette('grey', 3)};
      font-size: 20px;

      &:hover {
        color: #ffffff;
      }
    }
  }
`;

const ComposeMail = styled(ComposeMails)`
  padding: 0 0 20px;
`;

const FormControl = styled(FormControls)`
  width: calc(100% - 25px);
  height: calc(100% - 25px);
  position: absolute;
  top: 13px;
  left: 13px;
  z-index: 1;

  @media only screen and (max-width: 1099px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.15);
    padding: 0 10px;

    ${IconButton} {
      width: 38px;
      height: 38px;
      margin-right: 0;

      ${Icon} {
        font-size: 22px;
        color: #ffffff;

        &:hover {
          color: #ffffff;
        }
      }
    }
  }

  ${InputSearch} {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    ${InputAdornment} {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 20px;

      ${Icon} {
        color: #ffffff;
      }
    }

    input {
      height: 100%;
      padding: 7px 15px;
      padding-left: 60px;
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.15);
      transition: all 0.3s ease;

      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.25);
      }

      @media only screen and (max-width: 1099px) {
        padding-left: 15px;
        background-color: transparent;

        &:hover,
        &:focus {
          background-color: transparent;
        }
      }

      &::-webkit-input-placeholder {
        color: #ffffff;
        opacity: 1;
      }

      &:-moz-placeholder {
        color: #ffffff;
        opacity: 1;
      }

      &::-moz-placeholder {
        color: #ffffff;
        opacity: 1;
      }
      &:-ms-input-placeholder {
        color: #ffffff;
        opacity: 1;
      }
    }
  }
`;

const MailActionBar = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  margin-bottom: 20px;
  position: relative;
  box-shadow: ${palette('shadows', 1)};

  @media only screen and (max-width: 1099px) {
    margin-bottom: 15px;
  }
`;

const SearchIcon = styled(IconButton)`
  padding: 0;
`;
const MailActionDefaultView = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;

  @media only screen and (max-width: 767px) {
    padding: 0 10px;
  }

  ${IconButton} {
    width: 38px;
    height: 38px;
    margin-right: 20px;

    ${Icon} {
      color: #ffffff;

      &:hover {
        color: #ffffff;
      }
    }
  }

  .cUrr3nt-bUck3T {
    font-size: 17px;
    color: #ffffff;
    font-weight: 500;
  }

  ${SearchIcon} {
    width: 35px;
    height: 35px;
    margin-right: 0;
    margin-left: auto;

    ${Icon} {
      font-size: 22px;
      color: #ffffff;

      &:hover {
        color: #ffffff;
      }
    }
  }
`;

export {
  Navigations,
  MailListBox,
  MailActionBar,
  MailActionDefaultView,
  InputLabel,
  Icon,
  IconButton,
  SearchIcon,
  InputAdornment,
  InputSearch,
  FormControl,
  ComposeModalHeader,
  ComposeModalActionBtns,
  ComposeMail,
  BackbtnWrapper,
};
export default WithDirection(MailBox);
