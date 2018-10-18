import styled from 'styled-components';
import { palette } from 'styled-theme';
import Buttons from '../../../components/uielements/button';
import WithDirection from '../../../settings/withDirection';

const WDButton = styled(Buttons)``;

const WDAlgoliaSearchPageWrapper = styled.div`
  padding: 50px 30px 30px;
  overflow: hidden;
  background-color: ${palette('grey', 1)};
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  @media only screen and (max-width: 767px) {
    padding: 50px 15px;
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    padding: 50px 30px;
  }

  ${WDButton} {
    margin-bottom: 20px;
    margin: ${props =>
      props['data-rtl'] === 'rtl' ? '0 auto 20px 0' : '0 0 20px auto'};
    display: flex;

    &:hover {
      background-color: rgba(51, 105, 231, 0.12);
    }
  }

  &.sidebarOpen {
    .algoliaSidebar {
      margin: ${props =>
        props['data-rtl'] === 'rtl' ? '0 0 0 30px' : '0 30px 0 0'};
    }
  }

  .algoliaMainWrapper {
    width: 100%;
    display: flex;
  }
`;

const AlgoliaSearchPageWrapper = WithDirection(WDAlgoliaSearchPageWrapper);
const Button = WithDirection(WDButton);

export { Button };
export default AlgoliaSearchPageWrapper;
