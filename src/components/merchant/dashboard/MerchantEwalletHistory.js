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
      id: JSON.parse(localStorage.getItem('merchantLogged')).details._id,
      perPage: 5,
      totalCount: 100,
      allhistory: [],
      copyallhistory: [],
      activePage: 1,
      history: [],
      notification: '',
      filtername: "All"
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.getHistory();
    }, 2000);
    // this.getHistory()
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
      .post(`${MERCHANT_API}/getTransHistory`, {
        page: this.state.activePage,
        offset: this.state.perPage,
        merchant_id: this.state.id,
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          const history = res.data.history.reverse();
          console.log("outside")
          if (this.state.filtername == "All") {
            // this.setState({ history: this.state.copyallhistory })
            console.log("inside")
            this.setState(
              {
                allhistory: history,
                copyallhistory: history,
                totalCount: res.data.history.length,
              },
              () => {
                this.showHistory();
              },
            );
          } else {
            const filterdatavalue = history.filter((element) => {
              return element.Value.tx_data.tx_type == this.state.filtername
            })
            console.log(filterdatavalue)
            this.setState(
              {
                allhistory: filterdatavalue,
                copyallhistory: filterdatavalue,
                totalCount: filterdatavalue.length,
              },
              () => {
                this.showHistory();
              },
            );
            // console.log(this.state.allhistory)
            // this.setState({ history: filterdatavalue })
          }







          // this.setState(
          //   {
          //     allhistory: history,
          //     copyallhistory: history,
          //     totalCount: res.data.history.length,
          //   },
          //   () => {
          //     this.showHistory();
          //   },
          // );
        }
      })
      .catch((err) => { });
  };

  getHistoryTotal = () => {
    axios
      .post(`${MERCHANT_API}/getTransHistory`, {merchant_id:this.state.id})
      .then((res) => {
        if (res.status === 200) {
          this.setState({ totalCount: res.data.total }, () => {
            this.getHistory();
          });
        }
      })
      .catch((err) => { });
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
      const d = readable.getDate(); // returns 15
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
            {/* <div className="labelSmallGrey">Completed</div> */}
            {b.Value.tx_data.tx_type == "DR" ? (
              <div className="labelSmallGrey"><h2>Debit</h2></div>
            ) : (
                <div className="labelSmallGrey"><h2>Credit</h2></div>
              )}
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

  filterData = (value) => {
    console.log("clck")
    console.log(value)
    this.setState({ filtername: value })

    // if (value == "All") {
    //   this.setState({ history: this.state.copyallhistory })
    // } else {
    //   const filterdatavalue = this.state.copyallhistory.filter((element) => {
    //     return element.Value.tx_data.tx_type == value
    //   })
    //   console.log(filterdatavalue)
    //   console.log(this.state.allhistory)
    //   this.setState({ history: filterdatavalue })
    // }




  }


  render() {
    const dis = this;
    console.log(this.state.allhistory)
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
                  <h3>Merchant Transaction</h3>
                  <h5>E-wallet activity</h5>
                </div>
              </div>
              <div className="cardBody">
                <div className="clr">
                  <div className="menuTabs" onClick={() => this.filterData('All')}>
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
