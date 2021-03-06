import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import InvoiceNumberCard from '../../shared/InvoiceNumberCard';
import CounterInvoiceCard from '../../shared/CounterInvoiceCard';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import GroupListCard from './GroupListCard';
import Sidebar from '../../shared/sidebars/Sidebar';
import FormGroup from '../../shared/FormGroup';
import TextInput from '../../shared/TextInput';
import StaffHeader from '../../shared/headers/cashier/StaffHeader';
import Container from '../../shared/Container';
import Card from '../../shared/Card';
import Popup from '../../shared/Popup';
import Col from '../../shared/Col';
import Row from '../../shared/Row';
import Button from '../../shared/Button';
import Main from '../../shared/Main';
import GroupNumberCard from '../../shared/GroupNumberCard';
import { generateStaffOTP, fetchStats, openStaff, closeStaff} from '../api/CashierAPI';
import Loader from '../../shared/Loader';
import Footer from '../../Footer';
const StaffDashboardPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem('cashierLogged')).cashier,
  );
  const bankName = JSON.parse(localStorage.getItem('cashierLogged')).bank.name;
  const bankLogo = JSON.parse(localStorage.getItem('cashierLogged')).bank.logo;
  const [stats, setStats] = useState({});
  const [resend, setResend] = useState(false);
  const [Popupopen, setPopupopen] = useState(false);
  const [Popupclose, setPopupclose] = useState(false);
  
  const [timer, setTimer] = useState(0);
  const [otpTxt, setOtpTxt] = useState('Your OTP is');
  const [otpOpt, setOtpOpt] = useState('openingBalance');
  const [otpId, setOtpId] = useState('');
  const [OTPLoading, setOTPLoading] = useState(false);
  const email = JSON.parse(localStorage.getItem('cashierLogged')).staff.email;
  const mobile = JSON.parse(localStorage.getItem('cashierLogged')).staff.mobile;

  const closePopup = () => {
    setPopupopen(false);
    setPopupclose(false)
  };

  const getStats = () => {
    setLoading(true);
    fetchStats('staff')
      .then((data) => {
        setStats(data.stats);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const open = () => {
    setOTPLoading(true);
    setLoading(true);
    openStaff()
      .then((data) => {
        getStats();
        setOTPLoading(false);
        closePopup();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const close = () => {
    setOTPLoading(true);
    setLoading(true);
    closeStaff()
      .then((data) => {
        getStats();
        setOTPLoading(false);
        closePopup();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const startTimer = () => {
    let couyntdown = 30;
    var timeron = setInterval(function() {
      if (couyntdown <= 0) {
        clearInterval(timeron);
        setResend(true);
      } else {
        couyntdown = Number(couyntdown) - 1;
        setTimer(couyntdown);
      }
    }, 1000);
  };

  
  const inputFocus = (e) => {
    const { target } = e;
    target.parentElement.querySelector('label').classList.add('focused');
  };

  const inputBlur = (e) => {
    const { target } = e;
    if (target.value == '') {
      target.parentElement.querySelector('label').classList.remove('focused');
    }
  };

  const generateOTP = () => {
    setTimer(30);
    setResend(false);
    generateStaffOTP(email,mobile,otpOpt,otpTxt)
      .then(res => {
        setOtpId(res.data.id);
        setPopupopen(true);
        startTimer();
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const generatecloseOTP = () => {
    setTimer(30);
    setResend(false);
    generateStaffOTP(email,mobile,otpOpt,otpTxt)
      .then(res => {
        setOtpId(res.data.id);
        setPopupclose(true);
        startTimer();
      })
      .catch(err => {
        setLoading(false);
      });
  };


  useEffect(() => {
    getStats();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Merchant Dashboard | STAFF | E-WALLET </title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <StaffHeader active="dashboard" />
      <Container verticalMargin>
      <Sidebar marginRight>
        <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <Row>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
          {
          stats.is_closed? (
              <Button
                dashBtn
                onClick={()=>generateOTP()}
              >
                  Open My Counter
              </Button>
            ) : (
                <Button dashBtn disabled>
                  Counter is open
                </Button>
              )}
          </Col>
        </Row>
        <Row style={{ marginTop: '75%' }}>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
          {
          stats.is_closed? (
              <Button
                dashBtn
                disabled
              >
                  Close my day
              </Button>
            ) : (
                <Button
                  dashBtn
                  onClick={()=>generatecloseOTP()}
                >
                  Close my day
                </Button>
              )}
          </Col>
        </Row>
        </Card>
      </Sidebar>
        <Main>
          <Row>
            <GroupNumberCard no={groupList.length} />
            <InvoiceNumberCard no={stats.bills_raised} />
            <CounterInvoiceCard no={stats.counter_invoices} />
            <PendingInvoiceCard no={stats.bills_raised - stats.bills_paid} />
          </Row>
          <GroupListCard setLoading={(val) => {}} group={setGroupList} />
        </Main>
      </Container>
      {Popupopen ? (
          <Popup close={closePopup} accentedH1>

              <div>
                <h1>Verify OTP</h1>
                <form action="" method="post" onSubmit={open}>
                  <FormGroup>
                    <label>OTP*</label>
                    <TextInput
                      type="text"
                      name="otp"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      required
                    />
                  </FormGroup>
                  {OTPLoading ? (
                    <Button filledBtn marginTop="50px" disabled>
                      <Loader />
                    </Button>
                  ) : (
                    <Button filledBtn marginTop="50px">
                      <span>Verify</span>
                    </Button>
                  )}

                  <p className="resend">
                    Wait for <span className="timer">{timer}</span>{' '}
                    to{' '}
                    {resend ? (
                      <span className="go" onClick={()=>{generateOTP()}}>
                        Resend
                      </span>
                    ) : (
                      <span>Resend</span>
                    )}
                  </p>
                </form>
              </div>
           
          </Popup>
        ) : null}
      {Popupclose ? (
          <Popup close={closePopup} accentedH1>

              <div>
                <h1>Verify OTP</h1>
                <form action="" method="post" onSubmit={close}>
                  <FormGroup>
                    <label>OTP*</label>
                    <TextInput
                      type="text"
                      name="otp"
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      required
                    />
                  </FormGroup>
                  {OTPLoading ? (
                    <Button filledBtn marginTop="50px" disabled>
                      <Loader />
                    </Button>
                  ) : (
                    <Button filledBtn marginTop="50px">
                      <span>Verify</span>
                    </Button>
                  )}

                  <p className="resend">
                    Wait for <span className="timer">{timer}</span>{' '}
                    to{' '}
                    {resend ? (
                      <span className="go" onClick={()=>{generatecloseOTP()}}>
                        Resend
                      </span>
                    ) : (
                      <span>Resend</span>
                    )}
                  </p>
                </form>
              </div>
           
          </Popup>
        ) : null}
         <Footer bankname={bankName} banklogo={bankLogo}/>
    </Fragment>
  );
};

export default StaffDashboardPage;
