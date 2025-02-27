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
      readOnly: JSON.parse(localStorage.getItem('cashierLogged')).staff.read_only,
      loading: true,
      lastdate: null,
      tomorrow: false,
      otp: '',
      isClosed:false,
      total: 0,
      closingBalance:0,
      cashInHand: 0,
      cashCollected: 0,
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

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleCheckbox = event => {
    const { value, name } = event.target;
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

          this.setState({
            openingBalance: res.data.openingBalance,
            closingBalance: res.data.closingBalance,
            isClosed:res.data.isClosed,
            loading: false,
            balance: res.data.cashInHand,
            cashCollected: res.data.cashInHand-res.data.openingBalance,
          }, () => {
            var dis = this;
            setTimeout(function () {
              dis.getDashStats();
            }, 3000);

          });
        }
      })
      .catch(err => {
        var dis = this;
        setTimeout(function () {
          dis.getDashStats();
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
    console.log(this.state.denomination, this.state.total)
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
                this.getDashStats();
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
         <h3 style ={{textAlign:'center'}}>
          Closing Balance
        </h3>
        <div style ={{textAlign:'center', fontSize:'20px'}} className="cardValue">
          {CURRENCY} {this.state.closingBalance.toFixed(2)}
        </div>
        {!this.state.readOnly ? (
          <div>
        <Row>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
          {
          !this.state.isClosed ? (
            <Button 
            dashBtn
            onClick={this.showOpeningPopup}
            >
              
               Close my day
            </Button>
          ) : (
            <Button
              dashBtn
              disabled>
                   Close my day
              </Button>
            )}
          </Col>
        </Row>
        </div>
        ):""}
        {/* <Row>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
          <Button
              dashBtn
              onClick={this.showHistoryPop}
            >
              History
            </Button>
          </Col>
        </Row> */}
        {this.state.openingPopup ? (
          <Popup close={this.closePopup.bind(this)} accentedH1>
            {this.state.showOpeningOTP ? (
              <div>
                <h1>Verify OTP</h1>
                <form action="" method="post" onSubmit={this.verifyOpeningOTP}>
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
                <h1>Enter Real Closing Bills & Coins count</h1>
                <form action="" method="post" onSubmit={this.addOpeningBalance}>
                  <FormGroup>
                    <Grid container>
                      {this.state.denomination.map((element, index) => (
                        <Grid
                          item
                          key={`text-field-${index}`}
                          xs={12}
                          container
                          alignItems="center"
                          style={{ textAlign: 'center' }}
                          // spacing={8}
                        >
                          <Grid item xs={3}>
                            <Typography
                              className={classes.currencyElement}
                              key={`text-field-${index}`}
                              style={{
                                fontWeight: 600,
                                fontSize: '14px',
                                textAlign: 'right',
                              }}
                            >
                              {this.state.currency} {element.val}
                            </Typography>
                          </Grid>

                          <Grid item xs={2}>
                            <Typography
                              style={{
                                fontSize: '14px',
                                textAlign: 'right',
                                paddingRight: '3px',
                              }}
                            >
                              X
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Col cW="60%" style={{ marginLeft: '18%' }}>
                              <TextInput
                                marginTop
                                type="text"
                                // name={this.state.denominationValue[index]}
                                autoFocus
                                // value={this.state.denomination[index].num}
                                onChange={e => {
                                  const value = e.target.value;
                                  this.setState(prevState => {
                                    const { denomination } = prevState;
                                    denomination[index].num = value;
                                    return { ...prevState, denomination };
                                  });
                                }}
                              />
                            </Col>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </FormGroup>
                  <FormGroup>
                    <Row style={{ marginTop: '5%' }}>
                      <Col cW="15%" textAlign="right">
                        <strong>TOTAL</strong>
                      </Col>
                      <Col cW="20%" textAlign="center">
                        =
                      </Col>
                      <Col cW="35%">
                        {
                          (this.state.total = this.state.denomination.reduce(
                            (a, c) => Number(c.num * c.val || 0) + a,
                            0,
                          ))
                        }
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '5%', marginLeft: '-5%' }}>
                      <Col cW="20%" textAlign="right">
                        <strong>Cash Collected</strong>
                      </Col>
                      <Col cW="20%" textAlign="center">
                        =
                      </Col>
                      <Col cW="35%">{this.state.cashCollected}</Col>
                    </Row>
                    <Row style={{ marginTop: '5%', marginLeft: '-5%' }}>
                      <Col cW="20%" textAlign="right">
                        <strong>Discrepancy</strong>
                      </Col>
                      <Col cW="20%" textAlign="center">
                        =
                      </Col>
                      <Col cW="35%">
                        {this.state.total - this.state.cashCollected}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <TextInput
                      marginTop
                      type="text"
                      name="note"
                      autoFocus
                      placeholder="Remarks"
                      value={this.state.note}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <div
                    style={{
                      marginTop: '20px',
                      fontSize: '18px',
                      textAlign: 'center',
                    }}
                  >
                    <input
                      type="checkbox"
                      name="agree"
                      value={this.state.agree}
                      checked={this.state.agree}
                      onClick={this.handleCheckbox}
                    />{' '}
                    Close accounts for the day?
                  </div>

                  {this.state.editBranchLoading ? (
                    <Button filledBtn marginTop="50px" disabled>
                      <Loader />
                    </Button>
                  ) : (
                    <Button filledBtn marginTop="50px">
                      <span>Submit</span>
                    </Button>
                  )}
                </form>
              </div>
            )}
          </Popup>
        ) : null}

        {this.state.historyPop ? (
          <Popup close={this.closePopup.bind(this)} accentedH1 bigBody>
            <div>
              <h1>Closing Balance History</h1>
              {this.state.historyLoading ? (
                <Button filledBtn disabled>
                  <Loader />
                </Button>
              ) : (
                <Table marginTop="34px" smallTd>
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Added On</th>
                       <th>Denomination</th>
                       <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.history && this.state.history.length > 0
                      ? this.state.history.map(function(b) {
                        var td = JSON.parse(b.transaction_details);
                          var fulldate = dis.formatDate(b.created_at);
                          return (
                            <tr key={b._id}>
                              <td>
                                {CURRENCY} {b.amount.toFixed(2)}
                              </td>
                              <td>
                                <div className="labelGrey">{fulldate}</div>
                              </td>
                              <td>{ td.denomination ? td.denomination.map(function(v){
                                return( v.num != '' ? <div>{v.val} : {v.num}</div> : null)
                              }) : null}</td>
                               <td>{td.note}</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              )}
            </div>
          </Popup>
        ) : null}

      </Card>
    );
  }
}

export default withStyles(styles)(CashierClosingBalance);
