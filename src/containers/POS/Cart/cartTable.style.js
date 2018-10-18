import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition } from '../../../settings/style-util';
import WithDirection from '../../../settings/withDirection';

const ProductsTable = styled.div`
  width: 100%;

  @media only screen and (max-width: 767px) {
    overflow-x: auto;
    margin: 0;
  }

  table {
    width: 100%;
    padding: 20px 30px 30px;
    display: flex;
    flex-direction: column;
    box-shadow: ${palette('shadows', 2)};
    background-color: #fff;
    box-sizing: border-box;

    @media only screen and (max-width: 767px) {
      width: 767px;
      overflow: hidden;
    }

    /* TABLE HEAD */
    thead {
      width: 100%;
      min-height: 50px;
      border-bottom: 1px solid ${palette('grey', 2)};

      tr {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        th {
          font-size: 14px;
          font-weight: 500;
          color: ${palette('grey', 9)};
          line-height: 1.2;
          white-space: nowrap;
          padding: 15px 0;
          margin: 0 20px;
          width: 15%;
          text-align: center;
          border-bottom: 0;

          &:last-child {
            margin-right: 0;
            text-align: right;
          }

          @media only screen and (max-width: 991px) {
            margin: 0 10px;
            flex-shrink: 0;
          }

          &.itemRemove {
            width: 50px;
            margin: 0;
            flex-shrink: 0;
            @media only screen and (max-width: 991px) {
              width: 30px;
            }
          }

          &.itemImage {
            width: 80px;
            flex-shrink: 0;

            @media only screen and (max-width: 991px) {
              width: 60px;
            }
          }

          &.itemName {
            max-width: none;
            text-align: ${props =>
              props['data-rtl'] === 'rtl' ? 'right' : 'left'};
            width: 45%;

            @media only screen and (max-width: 991px) {
              margin: 0 10px;
              flex-shrink: 1;
            }
          }
        }
      }
    }

    /* TABLE BODY */
    tbody {
      width: 100%;

      tr {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        min-height: 140px;
        height: auto;
        border-bottom: 1px solid ${palette('grey', 2)};

        &.noItemMsg {
          min-height: 300px;
          justify-content: center;
          font-size: 30px;
          font-weight: 300;
          color: ${palette('grayscale', 1)};
          line-height: 1.2;
        }

        td {
          font-size: 14px;
          font-weight: 500;
          color: ${palette('grey', 9)};
          line-height: 1.2;
          overflow: hidden;
          padding: 15px 0;
          margin: 0 20px;
          width: 15%;
          text-align: center;
          border-bottom: 0;

          &.itemQuantity {
            > div > div {
              width: 130px;

              &:before {
                display: none;
                background-color: ${palette('grey', 3)};
              }

              input {
                height: 1.65em;
                text-align: center;
              }

              &:after {
                display: none;
                background-color: ${palette('blue', 6)};
              }

              &:hover::before {
                background-color: ${palette('blue', 2)};
              }
            }
          }

          &:last-child {
            margin-right: 0;
            text-align: right;
          }

          @media only screen and (max-width: 991px) {
            margin: 0 10px;
            flex-shrink: 0;
          }

          h3 {
            font-size: 14px;
            font-weight: 500;
            color: ${palette('grey', 9)};
            line-height: 1.2;
            margin-bottom: 10px;
          }

          p {
            font-size: 12px;
            font-weight: 400;
            color: ${palette('grey', 5)};
            line-height: 1.5;
          }

          span {
            font-size: 14px;
            font-weight: 500;
            color: ${palette('grey', 9)};
          }

          &.itemRemove {
            text-align: center;
            width: 50px;
            margin: 0;
            flex-shrink: 0;
            margin-left: 0;
            cursor: pointer;

            span {
              font-size: 18px;
              color: ${palette('grey', 8)};
              opacity: 0;
              ${transition()};
            }

            @media only screen and (max-width: 991px) {
              width: 30px;
              margin-left: 10px;
            }
          }

          &.itemImage {
            width: 80px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            @media only screen and (max-width: 991px) {
              width: 60px;
            }
          }

          &.itemName {
            text-align: ${props =>
              props['data-rtl'] === 'rtl' ? 'right' : 'left'};
            max-width: none;
            width: 45%;

            @media only screen and (max-width: 991px) {
              margin: 0 10px;
              flex-shrink: 1;
            }
          }
        }

        &.totalBill {
          padding: 0;
          margin-top: 0;
          min-height: 70px;
          border-bottom: 0;
        }

        &:hover {
          .itemRemove {
            span {
              opacity: 1;
            }
          }
        }
      }
    }

    /* TABLE FOOTER */
    tfoot {
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;

      tr {
        width: 100%;
        display: flex;
        align-items: flex-end;

        td {
          border-bottom: 0;
          padding: 0;

          .fullWidth {
            width: 100%;

            label {
              font-size: 0.9rem;
              color: ${palette('grey', 6)};
            }
          }

          &.buttonsWrapper {
            display: flex;
            align-items: center;

            .cartCheckoutBtn {
              span {
                a {
                  color: ${palette('indigo', 5)};
                  text-decoration: none;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default WithDirection(ProductsTable);
