import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Table from '../../shared/Table';
import Card from '../../shared/CashierCard';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Popup from '../../shared/Popup';
import Loader from '../../shared/Loader';
import FormGroup from '../../shared/FormGroup';
import TextInput from '../../shared/TextInput';
import notify from '../../utils/Notify';
import PayBillPopup from '../../../components/cashier/MerchantPayBills/PayBillPopup';
import TransactionReceipt from '../../../components/cashier/dashboard/TransactionReciept';

// import withStyles from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core';

import { API_URL, STATIC_URL, CURRENCY } from '../../constants';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const token = localStorage.getItem('cashierLogged');


const styles = theme => ({
  currencyElement: {
    // color: 'red',
  },
});

class CashierClosingBalance extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      lastdate: null,
      tomorrow: false,
      payBillsPopup: false,
      receiptPopup:false,
      receiptvalues:{},
      otp: '',
      balance1: 0,
      balance2: 0,
      total: 0,
      cashInHand: 0,
      cid: JSON.parse(localStorage.getItem('cashierLogged')).position._id,
      popup: false,
      showOtp: false,
      assignPop: false,
      agree: false,
      token,
      otpEmail: JSON.parse(localStorage.getItem('cashierLogged')).staff.email,
      otpMobile: JSON.parse(localStorage.getItem('cashierLogged')).staff.mobile,
      openCashierPopup: false,
      denomination: [],
      // denominationValue: [],
      currency: 'XOF',
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  onPayBillsPopupClose = () => {
    this.setState({
      payBillsPopup:false,
    });
  };

  onPayBillsPopupOpen = () => {
    this.setState({
      payBillsPopup:true,
    });
  };

  onReceiptPopupOpen = () => {
    this.setState({
      receiptPopup:true,
    });
  };

  onReceiptClose = () => {
    this.setState({
      receiptPopup:false,
    });
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleCheckbox = event => {
    const { value, name } = event.target;
    console.log(value);
    if (value == 'true') {
      var v = false;
    } else {
      var v = true;
    }
    this.setState({
      [name]: v,
    });
  };

  showOpeningPopup = v => {
    this.setState({ openingPopup: true, cashier_id: v._id });
  };
  showHistoryPop = () => {
    this.setState({ historyPop: true, historyLoading: true });
    this.getHistory();
  };

  getHistory = () => {
    axios
      .post(`${API_URL}/getAll`, {
        page: 'cashierledger',
        type: 'merchantPosition',
        where: { trans_type: 'CB', cashier_id: this.state.cid },
      })
      .then(res => {
        if (res.status == 200) {
          const history =  res.data.rows.reverse()
          this.setState(
            {
              history: history,
            },
            () => {
              this.setState({ historyLoading: false });
            },
          );
        }
      })
      .catch(err => {});
  };

  handleAmountChange = event => {
    const { value, name } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        // this.calculateTotal();
      },
    );
  };

  closePopup = () => {
    this.setState({
      note:'',
      popup: false,
      editPopup: false,
      agree:false,
      assignPop: false,
      openingPopup: false,
      historyPop: false,
      name: '',
      bcode: '',
      working_from: '',
      working_to: '',
      per_trans_amt: '',
      max_trans_amt: '',
      max_trans_count: '',
      mobile: '',
      credit_limit: '',
      otp: '',
      showOtp: false,
      showEditOtp: false,
      showOpeningOTP: false,
      openCashierPopup: false,
    });
  };

  addOpeningBalance = event => {
    event.preventDefault();
    if (this.state.agree) {
      if (this.state.total == '' || this.state.total == 0) {
        notify('You need to enter atleast one denomination', 'error');
      } else {
        this.setState(
          {
            showOpeningOTP: true,
            otpOpt: 'closingBalance',
            otpTxt: 'Your OTP to add closing balance is ',
          },
          () => {
            this.generateOTP();
          },
        );
      }
    } else {
      this.closePopup();
    }
  };
  startTimer = () => {
    var dis = this;
    var timer = setInterval(function() {
      if (dis.state.timer <= 0) {
        clearInterval(timer);
        dis.setState({ resend: true });
      } else {
        var time = Number(dis.state.timer) - 1;
        dis.setState({ timer: time });
      }
    }, 1000);
  };
  formatDate = date => {
    var months = [
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
    var isoformat = date;

    var readable = new Date(isoformat);
    var m = readable.getMonth(); // returns 6
    var d = readable.getDate(); // returns 15
    var y = readable.getFullYear();
    var h = readable.getHours();
    var mi = readable.getMinutes();
    var mlong = months[m];
    return d + ' ' + mlong + ' ' + y + ' ' + h + ':' + mi;
  };
  getDashStats = () => {
    axios
      .post(`${API_URL}/merchantStaff/getCashierDashStats`, {
      })
      .then(res => {
        if (res.status == 200) {
          let dd = res.data.lastdate == null ? null : this.formatDate(res.data.lastdate);

          this.setState({
            openingBalance: res.data.openingBalance,
            lastdate: dd,
            loading: false,
            branch_id: res.data.branchId,
            balance: res.data.cashInHand,
          }, () => {
            var dis = this;
            setTimeout(function () {
              dis.getStats();
            }, 3000);

          });
        }
      })
      .catch(err => {
        var dis = this;
        setTimeout(function () {
          dis.getStats();
        }, 3000);
      });
  };
  getStats = () => {
    axios
      .post(`${API_URL}/merchantStaff/getClosingBalance`, {
      })
      .then(res => {
        if (res.status == 200) {
          let b1 = res.data.balance1 == null ? 0 : res.data.balance1;
          let b2 = res.data.balance2 == null ? 0 : res.data.balance2;
          let dd =
            res.data.lastdate == null
              ? null
              : this.formatDate(res.data.lastdate);
          this.setState(
            {
              cashInHand: res.data.cashInHand,
              balance1: b1,
              balance2: b2,
              lastdate: dd,
              transactionStarted: res.data.transactionStarted,
              isClosed: res.data.isClosed
            },
            () => {
              var dis = this;
              setTimeout(function() {
                dis.getStats();
              }, 3000);
            },
          );
        }
      })
      .catch(err => {
        var dis = this;
        setTimeout(function() {
          dis.getStats();
        }, 3000);
      });
  };

  generateOTP = () => {
    this.setState({ resend: false, timer: 30 });

    axios
      .post(`${API_URL}/sendOTP`, {
        email: this.state.otpEmail,
        mobile: this.state.otpMobile,
        page: this.state.otpOpt,
        type: 'cashier',
        txt: this.state.otpTxt,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              otpId: res.data.id,
              notification: 'OTP Sent',
            });
            this.startTimer();
            this.success();
          }
        } else {
          throw res.data.error;
        }
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
        });
        this.error();
      });
  };

  openCashier = e => {
    this.setState({
      openCashierPopup: true
    });
  };
  verifyOpening = event => {
    event.preventDefault();

    this.setState({
      verifyEditOTPLoading: true,
    });
    axios
      .post(`${API_URL}/merchantStaff/openCashierBalance`, {})
      .then(res => {
        if (res.status == 200) {
          if (res.data.status===0) {
            throw res.data.message;
          } else {
            notify('Cashier opened successfully!', 'success');
            this.setState(
              {
                notification: 'Cashier opened successfully!',
              },
              function() {
                this.closePopup();
                this.getStats();
              },
            );
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          verifyEditOTPLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          verifyEditOTPLoading: false,
        });
        this.error();
      });

  };

  addOpeningBalance = event => {
    event.preventDefault();
      if(this.state.agree){

      this.setState(
        {
          showOpeningOTP: true,
          otpOpt: 'openingBalance',
          otpTxt: 'Your OTP to open cashier balance is ',
        },
        () => {
          this.generateOTP();
        },
      );
  }else{
    notify('You need to agree', 'error');
  }
  };

  verifyOpeningOTP = event => {
    event.preventDefault();

    this.setState({
      verifyEditOTPLoading: true,
    });
    axios
      .post(`${API_URL}/merchantStaff/addClosingBalance`,
        {
          denomination: this.state.denomination,
          total: this.state.total,
          note: this.state.note,
        })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            notify('Closing balance submitted successfully!', 'success');
            this.setState(
              {
                notification: 'Closing balance submitted successfully!',
              },
              function() {
                this.closePopup();
                this.getStats();
                var dis = this;
                // setTimeout(function(){
                //   localStorage.removeItem('cashierLogged');
                //   history.push('/cashier/' + dis.props.branchName);
                // }, 3000);
              },
            );
          }
        } else {
          const error = new Error(res.data.error);
          throw error;
        }
        this.setState({
          verifyEditOTPLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error : err.toString(),
          verifyEditOTPLoading: false,
        });
        this.error();
      });
  };
  componentDidMount() {
    console.log(JSON.parse(localStorage.getItem('cashierLogged')));
    this.getStats();
    this.getDashStats();
    axios
      .get(`${API_URL}/get-currency`)
      .then(d => {
        if (d.data.data.length != 0) {
          this.setState(prevState => ({
            ...prevState,
            denomination: d.data.data[0].denomination.map(d => ({
              val: d,
              num: '',
            })),
            currency: d.data.data[0].value,
            // notification: 'denomination added'
          }));
        }
      })
      .catch(err => {
        console.log(err.messages);
      });
  }

  render() {
    function inputFocus(e) {
      const { target } = e;
      target.parentElement.querySelector('label').classList.add('focused');
    }

    function inputBlur(e) {
      const { target } = e;
      if (target.value == '') {
        target.parentElement.querySelector('label').classList.remove('focused');
      }
    }
    var tempDate = new Date();
    var date =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear()
    const currDate = this.formatDate(tempDate);
    const { classes } = this.props;
    const dis = this;
    return (
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <Row>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
          {
          this.state.transactionStarted && !this.state.isClosed? (
              <Button
                dashBtn
                onClick={this.openCashier}
              >
                  Open My Counter
              </Button>
            ) : (
                <Button dashBtn disabled>
                  Open My Counter
                </Button>
              )}
          </Col>
        </Row>
        <Row style={{ marginTop: '75%' }}>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
            <Button dashBtn onClick={() => { this.onPayBillsPopupOpen() }}>
              Pay Invoices
            </Button>
          </Col>
        </Row>
        {this.state.payBillsPopup ? (
        <PayBillPopup
          close={() => this.onPayBillsPopupClose()}
          showReceiptPopup={(values) => {
            this.setState({
              receiptvalues:values,
            });
          }}
          show={this.onReceiptPopupOpen}
        />
      ) : (
        ''
      )}
      {this.statereceiptPopup ? (
        <TransactionReceipt
        values={this.state.receiptvalues}
        close={() => this.onReceiptClose()} 
      />
      ) : (
          ''
        )}

        {this.state.openCashierPopup ? (
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {this.state.showOpeningOTP ? (
              <div>
                <h1>Verify OTP</h1>
                <form action="" method="post" onSubmit={this.verifyOpening}>
                  <FormGroup>
                    <label>OTP*</label>
                    <TextInput
                      type="text"
                      name="otp"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      value={this.state.otp}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormGroup>
                  {this.verifyEditOTPLoading ? (
                    <Button filledBtn marginTop="50px" disabled>
                      <Loader />
                    </Button>
                  ) : (
                    <Button filledBtn marginTop="50px">
                      <span>Verify</span>
                    </Button>
                  )}

                  <p className="resend">
                    Wait for <span className="timer">{this.state.timer}</span>{' '}
                    to{' '}
                    {this.state.resend ? (
                      <span className="go" onClick={this.generateOTP}>
                        Resend
                      </span>
                    ) : (
                      <span>Resend</span>
                    )}
                  </p>
                </form>
              </div>
            ) : (
              <div>
                <h1>Open Cashier</h1>
                <form action="" method="post" onSubmit={this.addOpeningBalance}>


                <Row style={{ marginTop: '5%', marginLeft: '-5%' }}>

                    <Col cW="20%" textAlign="right">
                      <strong>Opening for the day</strong>
                    </Col>
                    <Col cW="20%" textAlign="center">
                      :
                    </Col>
                    <Col cW="35%">
                    {
                      currDate
                    }
                        {/* {Date.now().toISOString()} */}

                    </Col>
                  </Row>

                  <Row style={{ marginTop: '5%', marginLeft: '-5%' }}>

                    <Col cW="20%" textAlign="right">
                      <strong>Cash in Hand</strong>
                    </Col>
                    <Col cW="20%" textAlign="center">
                      :
                    </Col>
                    <Col cW="35%">
                      {
                        this.state.openingBalance
                      }
                    </Col>
                  </Row>
                    <Row style={{ marginTop: '5%', marginLeft: '-5%' }}>
                    <Col cW="20%" textAlign="right">
                      <strong></strong>
                    </Col>
                    <Col cW="20%" textAlign="center">

                    </Col>
                    <Col cW="35%">

                    </Col>
                  </Row>


                  <div style={{
                    marginTop: '20px',
                    fontSize: '18px',
                    textAlign: 'center'
                    }}>
                  <input type="checkbox"
                  name="agree"
                  value={this.state.agree}
                   checked={this.state.agree}
                   required
                              onClick={this.handleCheckbox} />  Agree to the opening balance?
                  </div>


                    <Button filledBtn marginTop="50px">
                      <span>Open</span>
                    </Button>

                </form>
              </div>
            )}
          </Popup>
        ) : null}
      </Card>
    );
  }
}

export default withStyles(styles)(CashierClosingBalance);
