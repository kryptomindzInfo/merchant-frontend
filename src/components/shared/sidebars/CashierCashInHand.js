import React, { Component } from 'react';
import axios from 'axios';
import Card from '../../shared/Card';
import Popup from '../../shared/Popup';
import TextInput from '../../shared/TextInput';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Loader from '../../shared/Loader';
import SelectInput from '../../shared/SelectInput';
import Table from '../../shared/Table';

import { API_URL, CURRENCY } from '../../constants';

import notify from '../../utils/Notify';


class CashierCashInHand extends Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
      readOnly: JSON.parse(localStorage.getItem('cashierLogged')).staff.read_only,
      cid: JSON.parse(localStorage.getItem('cashierLogged')).position._id,
      branchID: JSON.parse(localStorage.getItem('cashierLogged')).branch._id,
      cashierName: JSON.parse(localStorage.getItem('cashierLogged')).position.name,
      email: JSON.parse(localStorage.getItem('cashierLogged')).staff.email,
      mobile: JSON.parse(localStorage.getItem('cashierLogged')).staff.mobile,
      incoming: []
    }
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

  closePopup = () => {
    this.setState({
      popupSendMoney: false,
      showSendMoneyOTP: false,
      showAcceptOtp: false,
      showCancelOtp: false,
      amount: '',
      cashier_id: '',
      otp: '',
      popresult: [],
      historyPop: false,
      incomingPop: false
    });
  };

  showPopupSendMoney = () => {
    console.log('Hi');
    if (this.state.balance > 0) {
      this.setState({ popupSendMoney: true });
    } else {
      console.log('Hi');
      notify("You have no cash in hand to transfer", 'error');
    }
  };

  cancelTransfer = (i) => {
    event.preventDefault();
    this.setState(
      {
        cancelId: i._id,
        showCancelOtp: true,
        otp: '',
        otpOpt: 'cashierCancelTransfer',
        otpEmail: this.state.email,
        otpMobile: this.state.mobile,
        otpTxt: 'Your OTP to add cancel the transfer '
      },
      () => {
        this.generateOTP();
      },
    );
  };

  verifyCancel = event => {

    event.preventDefault();

    this.setState({
      verifySendMoneyOTPLoading: true,
    });
    axios
      .post(`${API_URL}/merchantStaff/cashierCancelTransfer`, {
        otpId: this.state.otpId,
        otp: this.state.otp,
        transfer_id: this.state.cancelId
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            console.log(res.data.status);
            notify('Transfer Cancelled!', 'success');
            this.closePopup();
            // this.props.refresh();
          }
        } else {
          throw res.data.error;
        }
        this.setState({
          verifySendMoneyOTPLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error.toString() : err.toString(),
          verifySendMoneyOTPLoading: false,
        }, () => {
          this.error();
        });

      });
  };

  verifyAccept = event => {

    event.preventDefault();

    this.setState({
      verifySendMoneyOTPLoading: true,
    });
    axios
      .post(`${API_URL}/merchantStaff/cashierAcceptIncoming`, {
        otpId: this.state.otpId,
        otp: this.state.otp,
        item: this.state.acceptId
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            console.log(res.data.status);
            notify('Transfer Accepted!', 'success');
            this.closePopup();
            // this.props.refresh();
          }
        } else {
          throw res.data.error;
        }
        this.setState({
          verifySendMoneyOTPLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error.toString() : err.toString(),
          verifySendMoneyOTPLoading: false,
        }, () => {
          this.error();
        });

      });
  };

  startTimer = () => {
    var dis = this;
    var timer = setInterval(function () {
      if (dis.state.timer <= 0) {
        clearInterval(timer);
        dis.setState({ resend: true });
      } else {
        var time = Number(dis.state.timer) - 1;
        dis.setState({ timer: time });
      }
    }, 1000);
  };

  generateOTP = () => {
    this.setState({ resend: false, timer: 30 });
    axios
      .post(`${API_URL}/sendOTP`, {
        email: this.state.otpEmail,
        mobile: this.state.otpMobile,
        page: this.state.otpOpt,
        type: 'merchantPosition',
        txt: this.state.otpTxt,
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.error) {
            throw res.data.error;
          } else {
            this.setState({
              otpId: res.data.id,
              showEditOtp: true,
            });
            this.startTimer();
            notify('OTP Sent', 'success');
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

  sendMoney = event => {
    if (this.state.amount > this.state.balance) {
      notify("Amount has to be lesser  than or equal to cash in hand", 'success');
    } else {
      event.preventDefault();
      this.setState(
        {
          showSendMoneyOTP: true,
          otp: '',
          otpOpt: 'cashierTransferMoney',
          otpEmail: this.state.email,
          otpMobile: this.state.mobile,
          otpTxt: 'Your OTP to add transfer money is '
        },
        () => {
          this.generateOTP();
        },
      );
    }

  };

  verifySendMoney = event => {

    event.preventDefault();
    let receiver = this.state.receiver_id.split(":");
    this.setState({
      verifySendMoneyOTPLoading: true,
    });
    axios
      .post(`${API_URL}/merchantStaff/cashierTransferMoney`, {
        otpId: this.state.otpId,
        otp: this.state.otp,
        amount: this.state.amount,
        sender_id: this.state.cid,
        sender_name: this.state.cashierName,
        receiver_id: receiver[0],
        receiver_name: receiver[1]
      })
      .then(res => {
        if (res.status == 200) {
          if (res.data.status==0) {
            throw res.data.message;
          } else {
            notify('Transaction Successfully Done', 'success');
            this.closePopup();
            // this.props.refresh();
          }
        } else {
          throw res.data.error;
        }
        this.setState({
          verifySendMoneyOTPLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          notification: err.response ? err.response.data.error.toString() : err.toString(),
          verifySendMoneyOTPLoading: false,
        }, () => {
          this.error();
        });

      });
  };

  accept = (i) => {
    event.preventDefault();
    this.setState(
      {
        acceptId: i,
        showAcceptOtp: true,
        otp: '',
        otpOpt: 'cashierAcceptTransfer',
        otpEmail: this.state.email,
        otpMobile: this.state.mobile,
        otpTxt: 'Your OTP to accept the transfer '
      },
      () => {
        this.generateOTP();
      },
    );
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
  showHistory = () => {
    this.setState({
      historyPop: true,
      historyLoading: true
    });
    this.getTransHistory();
  };

  showIncoming = () => {
    this.setState({
      incomingPop: true
    });
  };

  getTransHistory = () => {
    axios
      .post(`${API_URL}/merchantStaff/getCashierTransfers`, {
      })
      .then(res => {
        if (res.status == 200) {
          const history = res.data.history.reverse();
          this.setState({
            popresult: history,
            historyLoading: false
          });
        }
      })
      .catch(err => { });
  };

  getStats = () => {
    axios
      .post(`${API_URL}/merchantStaff/getCashierDashStats`, {
      })
      .then(res => {
        if (res.status == 200) {
          let dd = res.data.lastdate == null ? null : this.formatDate(res.data.lastdate);

          this.setState({

            lastdate: dd,
            transactionStarted: res.data.transactionStarted,
            loading: false,
            branch_id: res.data.branchId,
            balance: res.data.cashInHand,
            isClosed: res.data.isClosed
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

  getIncoming = () => {
    axios
      .post(`${API_URL}/merchantStaff/getCashierIncomingTransfer`, {
      })
      .then(res => {
        if (res.status == 200) {
          const history = res.data.result.reverse();
          this.setState({
            incoming: history
          }, () => {

            var dis = this;
            setTimeout(function () {
              dis.getIncoming();
            }, 3000);
          });
        }
      })
      .catch(err => {
        var dis = this;
        setTimeout(function () {
          dis.getIncoming();
        }, 3000);
      });
  };

  getCashiers = () => {
    axios
      .post(`${API_URL}/getAll`, {
        page: "merchantPosition",
        type: "merchantPosition",
        where: {
          branch_id: this.state.branchID,
          type: 'cashier',
          _id: { $ne: this.state.cid },
        }
      })
      .then(res => {
        if (res.status == 200) {
          this.setState({
            cashiers: res.data.rows
          });
        }
      })
      .catch(err => {

      });
  };
  componentDidMount() {
    this.setState({
      bank: this.props.historyLink
    });

    this.getCashiers();
    this.getIncoming();
    this.getStats();

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
    var dis = this;
    return (
      <Card marginBottom="54px" buttonMarginTop="32px" bigPadding>
        
        <h3 style ={{textAlign:'center'}}> Cash in Hand </h3>
        <div style ={{textAlign:'center' ,fontSize:'20px'}} className="cardValue">
          {CURRENCY} {this.state.balance.toFixed(2)}
        </div>
        {!this.state.readOnly ? (
          <div>
         <Row  style={{marginTop:'10px'}}>
          <Col cW="100%">
          {
          !this.state.isClosed ?
            <Button
              dashBtn
              onClick={this.showPopupSendMoney}

            >
              Cashier to Cashier Transfer
            </Button>
            :
            <Button 
              dashBtn
              disabled
            >
              Cashier to Cashier Transfer
            </Button>
          }
          </Col>
         </Row>
         <Row style={{marginTop:'10px'}}>
          <Col>
          {
            this.state.transactionStarted && !this.state.isClosed ?
            <Button
              smallDashBtn
              onClick={this.showIncoming}
            >
                {this.state.incoming.length} Pending
            </Button>
              :
              <Button
                smallDashBtn
                disabled
             >
                {this.state.incoming.length} Pending 
              </Button>
          }
          </Col>
          <Col>
          <Button
              smallDashBtn
              onClick={this.showHistory}
            >
                History
            </Button>
          </Col>
        </Row>
        </div>
        ):""}
        
        
        {this.state.popupSendMoney ? (

          <Popup

            close={this.closePopup.bind(this)}
            accentedH1
          >
            {this.state.showSendMoneyOTP ?
              <div>
                <h1 >Verify OTP</h1>
                <form action="" method="post" onSubmit={this.verifySendMoney} >
                  <p>&nbsp;</p>
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
                  {
                    this.state.verifySendMoneyOTPLoading ?
                      <Button filledBtn marginTop="50px" marginBottom="50px" disabled>
                        <Loader />
                      </Button>
                      :
                      <Button filledBtn marginTop="50px" marginBottom="50px">
                        <span>Verify</span>
                      </Button>
                  }


                  <p className="resend">Wait for <span className="timer">{this.state.timer}</span> to {this.state.resend ? <span className="go" onClick={this.generateOTP}>Resend</span> : <span>Resend</span>}</p>


                </form>
              </div>
              :
              <div>
                <h1>
                  Transfer Money
              </h1>
                <form
                  action=""
                  method="post"
                  onSubmit={this.sendMoney}
                >
                  <FormGroup>
                    <SelectInput
                      type="text"
                      name="receiver_id"
                      value={this.state.receiver_id}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option value="">
                        Select Cashier
                              </option>
                      {
                        this.state.cashiers && this.state.cashiers.length > 0 ?
                          this.state.cashiers.map(function (v) {
                            return <option value={v._id + ":" + v.name} >{v.name}</option>
                          })
                          :
                          null
                      }
                    </SelectInput>
                  </FormGroup>
                  <FormGroup>
                    <label>Amount*</label>
                    <TextInput
                      type="number"
                      name="amount"
                      min="1"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      value={this.state.amount}
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormGroup>
                  <Button filledBtn marginTop="20px">
                    <span>
                      Proceed
                        </span>
                  </Button>


                </form>
              </div>
            }
          </Popup>
        ) : null}

        {this.state.historyPop ? (
          <Popup close={this.closePopup.bind(this)} accentedH1 bigBody>
            {this.state.showCancelOtp ?
              <div>
                <h1 >Verify OTP</h1>
                <form action="" method="post" onSubmit={this.verifyCancel} >
                  <p>&nbsp;</p>
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
                  {
                    this.state.verifySendMoneyOTPLoading ?
                      <Button filledBtn marginTop="50px" marginBottom="50px" disabled>
                        <Loader />
                      </Button>
                      :
                      <Button filledBtn marginTop="50px" marginBottom="50px">
                        <span>Verify</span>
                      </Button>
                  }


                  <p className="resend">Wait for <span className="timer">{this.state.timer}</span> to {this.state.resend ? <span className="go" onClick={this.generateOTP}>Resend</span> : <span>Resend</span>}</p>


                </form>
              </div>
              :
              <div>
                <h1>Cashier to Cashier Transfer History</h1>
                {this.state.historyLoading ? (
                  <Button filledBtn disabled>
                    <Loader />
                  </Button>
                ) : (
                    <Table marginTop="34px" smallTd textAlign="center">
                      <thead>
                        <tr><th>Date & Time</th> <th>Details</th><th>Status</th></tr>
                      </thead>

                      <tbody>
                        {this.state.popresult && this.state.popresult.length > 0
                          ? this.state.popresult.map(function (b) {
                            var isoformat = b.created_at;
                            var fulldate = dis.formatDate(isoformat);

                            return <tr key={b._id}>
                              <td>
                                <div className="labelGrey">{fulldate}</div>
                              </td>
                              <td>
                                <div className="labelBlue">
                                  {
                                    b.sender_id === JSON.parse(localStorage.getItem('cashierLogged')).position._id ?
                                      <span>Transfered {CURRENCY} {b.amount} to {b.receiver_name}</span>
                                      :
                                      <span>Received {CURRENCY} {b.amount} from {b.sender_name}</span>
                                  }  </div></td>
                              <td className="right">
                                <div className="labelGrey" >
                                  {b.status == 0 ? (
                                    <Button onClick={() => dis.cancelTransfer(b)} style={{ float: "right" }}>
                                      Cancel
                                    </Button>
                                  ) : (
                                      b.status == -1 ?
                                        <span>
                                          Cancelled
                                    </span>
                                        :
                                        <span>
                                          Completed
                                    </span>
                                    )}
                                </div>
                              </td>
                            </tr>

                          })
                          : null}
                      </tbody>
                    </Table>
                  )}
              </div>
            }
          </Popup>
        ) : null}

        {this.state.incomingPop ? (
          <Popup close={this.closePopup.bind(this)} accentedH1 bigBody>
            {this.state.showCancelOtp ?
              <div>
                <h1 >Verify OTP</h1>
                <form action="" method="post" onSubmit={this.verifyCancel} >
                  <p>&nbsp;</p>
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
                  {
                    this.state.verifySendMoneyOTPLoading ?
                      <Button filledBtn marginTop="50px" marginBottom="50px" disabled>
                        <Loader />
                      </Button>
                      :
                      <Button filledBtn marginTop="50px" marginBottom="50px">
                        <span>Verify</span>
                      </Button>
                  }


                  <p className="resend">Wait for <span className="timer">{this.state.timer}</span> to {this.state.resend ? <span className="go" onClick={this.generateOTP}>Resend</span> : <span>Resend</span>}</p>


                </form>
              </div>
              :
              this.state.showAcceptOtp ?
                <div>
                  <h1 >Verify OTP</h1>
                  <form action="" method="post" onSubmit={this.verifyAccept} >
                    <p>&nbsp;</p>
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
                    {
                      this.state.verifySendMoneyOTPLoading ?
                        <Button filledBtn marginTop="50px" marginBottom="50px" disabled>
                          <Loader />
                        </Button>
                        :
                        <Button filledBtn marginTop="50px" marginBottom="50px">
                          <span>Verify</span>
                        </Button>
                    }


                    <p className="resend">Wait for <span className="timer">{this.state.timer}</span> to {this.state.resend ? <span className="go" onClick={this.generateOTP}>Resend</span> : <span>Resend</span>}</p>


                  </form>
                </div>
                :
                <div>
                  <h1>Incoming Transfers</h1>

                  <Table marginTop="34px" smallTd textAlign="center">
                    <thead>
                      <tr><th>Date & Time</th> <th>Details</th><th></th></tr>
                    </thead>

                    <tbody>
                      {this.state.incoming && this.state.incoming.length > 0
                        ? this.state.incoming.map(function (b) {
                          var isoformat = b.created_at;
                          var fulldate = dis.formatDate(isoformat);

                          return <tr key={b._id}>
                            <td>
                              <div className="labelGrey">{fulldate}</div>
                            </td>
                            <td>
                              <div className="labelBlue">
                                {
                                  <span>Recived {CURRENCY} {b.amount} from {b.sender_name}</span>
                                }  </div></td>
                            <td className="right">
                              <div className="labelGrey">
                                {b.status == 0 ? (
                                  <div>
                                    <Row>
                                      <Col>
                                        <Button onClick={() => dis.accept(b)}>Accept</Button></Col><Col>
                                        <Button onClick={() => dis.cancelTransfer(b)}>Cancel</Button></Col>
                                    </Row>
                                  </div>
                                ) : (
                                    b.status == -1 ?
                                      <span>
                                        Cancelled
                                    </span>
                                      :
                                      <span>
                                        Completed
                                    </span>
                                  )}
                              </div>
                            </td>
                          </tr>

                        })
                        : null}
                    </tbody>
                  </Table>

                </div>
            }
          </Popup>
        ) : null}
      </Card>
    );
  }
}

export default CashierCashInHand;
