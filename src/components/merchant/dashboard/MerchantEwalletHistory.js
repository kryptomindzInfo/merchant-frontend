import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import MerchantSideBar from '../../shared/sidebars/MerchantSideBar';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import Table from '../../shared/Table';
import { MERCHANT_API } from '../../constants';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

export default class MerchantEwalletHistory extends Component {
  constructor() {
    super();
    this.state = {
      perPage: 5,
      totalCount: 100,
      allhistory: [],
      activePage: 1,
      history: [],
      notification: '',
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.getHistory();
    }, 2000);
  }

  onChange(e) {
    if (e.target.files && e.target.files[0] != null) {
      this.fileUpload(e.target.files[0], e.target.getAttribute('data-key'));
    }
  }

  showHistory = () => {
    this.setState({ history: [] }, () => {
      const out = [];
      const start = (this.state.activePage - 1) * this.state.perPage;
      let end = this.state.perPage * this.state.activePage;
      if (end > this.state.totalCount) {
        end = this.state.totalCount;
      }
      for (let i = start; i < end; i += 1) {
        out.push(this.state.allhistory[i]);
      }
      this.setState({ history: out });
    });
  };

  getHistory = () => {
    axios
      .get(`${MERCHANT_API}/getTransHistory`, {
        page: this.state.activePage,
        offset: this.state.perPage,
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          const history = res.data.history.reverse();
          this.setState(
            {
              allhistory: history,
              totalCount: res.data.history.length,
            },
            () => {
              this.showHistory();
            },
          );
        }
      })
      .catch((err) => {});
  };

  getHistoryTotal = () => {
    axios
      .get(`${MERCHANT_API}/getTransHistory`, {})
      .then((res) => {
        if (res.status === 200) {
          this.setState({ totalCount: res.data.total }, () => {
            this.getHistory();
          });
        }
      })
      .catch((err) => {});
  };

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.showHistory();
  };

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  mappedhistory() {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return this.state.history.map((b) => {
      const isoformat = b.Timestamp;
      const readable = new Date(isoformat);
      const m = readable.getMonth(); // returns 6
      const d = readable.getDay(); // returns 15
      const y = readable.getFullYear();
      const h = readable.getHours();
      const mi = readable.getMinutes();
      const mlong = months[m];
      const fulldate = `${d} ${mlong} ${y} ${h}:${mi}`;
      return (
        <tr key={b.TxId}>
          <td>
            <div className="labelGrey">{fulldate}</div>
          </td>
          <td>
            <div className="labelBlue">{b.Value.tx_data.tx_details}</div>
            <div className="labelSmallGrey">Completed</div>
          </td>
          <td className="right">
            <div className="labelGrey">
              {b.Value.tx_data.tx_type === 'DR' ? (
                <span>XOF -{b.Value.amount}</span>
              ) : (
                <span>XOF {b.Value.amount}</span>
              )}
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const dis = this;
    return (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Ewallet History | Merchant </title>
        </Helmet>
        <MerchantHeader />
        <Container verticalMargin>
          <MerchantSideBar />
          <Main>
            <Card bigPadding>
              <div className="cardHeader">
                <div className="cardHeaderLeft">
                  <i className="material-icons">playlist_add_check</i>
                </div>
                <div className="cardHeaderRight">
                  <h3>E-Wallet Transaction</h3>
                  <h5>E-wallet activity</h5>
                </div>
              </div>
              <div className="cardBody">
                <div className="clr">
                  <div className="menuTabs" onClick={() => this.filterData('')}>
                    All
                  </div>
                  <div
                    className="menuTabs"
                    onClick={() => this.filterData('DR')}
                  >
                    Payment Sent
                  </div>
                  <div
                    className="menuTabs"
                    onClick={() => this.filterData('CR')}
                  >
                    Payment Recieved
                  </div>
                </div>
                <Table marginTop="34px" smallTd textAlign="left">
                  <tbody>
                    {this.state.history && this.state.history.length > 0
                      ? dis.mappedhistory()
                      : null}
                  </tbody>
                </Table>
                <div>
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.perPage}
                    totalItemsCount={this.state.totalCount}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </div>
              </div>
            </Card>
          </Main>
        </Container>
      </Fragment>
    );
  }
}
