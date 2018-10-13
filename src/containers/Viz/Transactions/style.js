import styled from 'styled-components';
import { palette } from 'styled-theme';
import Icons from '../../../components/uielements/icon';

const Icon = styled(Icons)``;

const TransactionWidget = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  .transactionDuration {
    font-size: 13px;
    font-weight: 400;
    margin: 0;
    color: ${palette('grey', 5)};
  }
`;

const Graph = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;

  .currency {
    flex-shrink: 0;
    display: flex;
    align-items: center;

    h3 {
      font-size: 24px;
      font-weight: 400;
      margin: 0 2px 0 0;
      color: ${palette('grey', 9)};
    }

    ${Icon} {
      font-size: 20px;

      &.upward {
        color: ${palette('green', 12)};
      }

      &.downward {
        color: ${palette('red', 5)};
      }
    }
  }

  .chartWrapper {
    width: 100%;
    max-width: 220px;
    display: flex;
    position: relative;
    height: 60px;
    margin-left: auto;

    canvas {
      position: absolute;
      top: 46%;
    }
  }
`;

export { TransactionWidget, Graph, Icon };
