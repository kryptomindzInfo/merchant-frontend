import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import Sidebar from '../../shared/sidebars/Sidebar';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Wrapper from '../../shared/Wrapper';
import FormGroup from '../../shared/FormGroup';
import TextInput from '../../shared/TextInput';
import Loader from '../../shared/Loader';
import Container from '../../shared/Container';
import ActionBar from '../../shared/ActionBar';
import Table from '../../shared/Table';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import { CURRENCY } from '../../constants';
import Button from '../../shared/Button';
import Popup from '../../shared/Popup';
import CreateInvoicePopup from './CreateInvoicePopup';
import UploadInvoicePopup from './UploadInvoicePopup';
import ViewInvoicePopup from './ViewInvoicePopup';
import InvoiceCards from './InvoiceCards';
import AmountCards from './AmountCards';
import StaffHeader from '../../shared/headers/cashier/StaffHeader';
import Tabs from '../../shared/Tabs';
import TabItem from '../../shared/TabItem';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import notify from '../../utils/Notify';
import Footer from '../../Footer';
import {
  generateStaffOTP,
  openStaff,
  closeStaff,
  fetchGroups,
  fetchstaffStats,
  fetchInvoices,
  invoiceApi,
  fetchTaxList,
  fetchOfferingList,
  getMerchantSettings,
  getCountries,
  getinfo,
} from '../api/CashierAPI';

function InvoiceListPage(props) {
  const bankName = JSON.parse(localStorage.getItem('cashierLogged')).bank.name;
  const bankLogo = JSON.parse(localStorage.getItem('cashierLogged')).bank.logo;
  const [createInvoicePopup, setCreateInvoicePopup] = React.useState(false);
  const [selectedGroupId, setSelectedGroupId] = React.useState();
  const [selectedGroupName, setSelectedGroupName] = React.useState('');
  const [stats, setStats] = useState({});
  const [uploadInvoicePopup, setUploadInvoicePopup] = React.useState(false);
  const [counterInvoiceAccess, setCounterInvoiceAccess] = React.useState(false);
  const [viewInvoicePopup, setViewInvoicePopup] = React.useState(false);
  const [counterClose, setCounterClose] = React.useState(false);
  const [toggleButton, setToggleButton] = React.useState('myinvoices');
  const [counterInvoice, SetCounterInvoice] = React.useState(false);
  const [offeringList, setOfferingList] = React.useState([]);
  const [defaultPeriod, setDefaultBillPeriod] = React.useState({});
  const [mode, setMode] = React.useState('');
  const [billTermList, setBillTermList] = React.useState([]);
  const [defaultTerm, setDefaultBillTerm] = React.useState({});
  const [countryList, setCountryList] = React.useState([]);
  const [taxList, setTaxList] = React.useState([]);
  const [invoiceList, setInvoiceList] = React.useState([]);
  const [invoiceType, setInvoiceType] = React.useState('new');
  const [editingInvoice, setEditingInvoice] = React.useState({});
  const [viewingInvoice, setViewingInvoice] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [allRow, setAllRow] = React.useState([]);
  const [paidRow, setPaidRow] = React.useState([]);
  const [unpaidRow, setUnpaidRow] = React.useState([]);
  const [draftRow, setDraftRow] = React.useState([]);
  const [counterRow, setCounterRow] = React.useState([]);
  const [groupList, setGroupList] = React.useState([]);
  const [resend, setResend] = useState(false);
  const [Popupopen, setPopupopen] = useState(false);
  const [Popupclose, setPopupclose] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpTxt, setOtpTxt] = useState('Your OTP is');
  const [otpOpt, setOtpOpt] = useState('openingBalance');
  const [otpId, setOtpId] = useState('');
  const [OTPLoading, setOTPLoading] = useState(false);
  const [amountRaised ,setAmountRaised] = useState(0);
  const [amountPaid ,setAmountPaid] = useState(0);
  const [amountPending ,setAmountPending] = useState(0);
  const [counterAmount ,setCounterAmount] = useState(0);
  const positionId =  JSON.parse(localStorage.getItem('cashierLogged')).position._id;
  const email = JSON.parse(localStorage.getItem('cashierLogged')).staff.email;
  const mobile = JSON.parse(localStorage.getItem('cashierLogged')).staff.mobile;
  const merchantId = JSON.parse(localStorage.getItem('cashierLogged')).merchant._id;
  

  const onCreateInvoicePopupClose = () => {
    setCreateInvoicePopup(false);
  };

  const getOfferingList = async () => {
    setLoading(true);
    fetchOfferingList().then((data) => {
      setOfferingList(data.list);
      setLoading(data.loading);
    });
  };
  const closePopup = () => {
    setPopupopen(false);
    setPopupclose(false)
  };

  const open = () => {
    setOTPLoading(true);
    setLoading(true);
    openStaff()
      .then((data) => {
        getStats(selectedGroupId);
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
        getStats(selectedGroupId);
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

  const getStats = (id) => {
    setLoading(true);
    fetchstaffStats(id)
      .then((data) => {
        setStats(data.stats);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
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

  const handleCreateInvoicePopupClick = (type, invoice, mod) => {
    setInvoiceType(type);
    setMode(mod);
    setViewInvoicePopup(false);
    setEditingInvoice(invoice);
    if (defaultTerm === undefined || defaultPeriod === undefined) {
      notify('Default setting not created', 'error');
    } else {
      setCreateInvoicePopup(true);
    }
  };
  const handleUploadInvoicePopupClick = () => {
    setUploadInvoicePopup(true);
  };

  const onUploadInvoicePopupClose = () => {
    setUploadInvoicePopup(false);
  };

  const handleViewInvoicePopupClick = (invoice) => {
    setViewingInvoice(invoice);
    setViewInvoicePopup(true);
  };

  const onViewInvoicePopupClose = () => {
    setViewInvoicePopup(false);
  };

  const setInvoices = (list) => {
    const draftRows = list.filter((invoice) => {
      return invoice.is_validated === 0;
    });
    const paidRows = list.filter((invoice) => {
      return invoice.paid === 1 && invoice.is_validated === 1;
    });
    const unpaidRows = list.filter((invoice) => {
      return (
        invoice.paid === 0 &&
        invoice.is_validated === 1 &&
        invoice.is_counter === false
      );
    });
    const counterRows = list.filter((invoice) => {
      return (
        invoice.paid === 0 &&
        invoice.is_validated === 1 &&
        invoice.is_counter === true
      );
    });
    setAmountRaised(
      list.reduce((a, b) => {
      return a + b.amount;
      }, 0));
    setAmountPaid(
      paidRows.reduce((a, b) => {
      return a + b.amount;
      }, 0));
    setAmountPending(
      unpaidRows.reduce((a, b) => {
      return a + b.amount;
      }, 0));
    setCounterAmount(
      counterRows.reduce((a, b) => {
      return a + b.amount;
      }, 0));
    setCounterRow(counterRows.reverse());
    setInvoiceList(paidRows.reverse());
    setPaidRow(paidRows.reverse());
    setUnpaidRow(unpaidRows.reverse());
    setDraftRow(draftRows.reverse());
  };

  const refreshInvoiceList = async (id) => {
    setLoading(true);
    fetchInvoices(id)
      .then((data) => {
        if (toggleButton === 'myinvoices') {
          const mylist = data.list.filter((invoice) => {
            return invoice.group_id === id;
          });
          setInvoices(mylist);
        } else {
          const otherlist = data.list.filter((invoice) => {
            return invoice.group_id !== id;
          });
          setInvoices(otherlist);
        }
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  const changeGroup = (id,name) => {
    setSelectedGroupName(name);
    setSelectedGroupId(id);
    refreshInvoiceList(id);
    getStats(id);
  }

  const toggleMyInvoice = async () => {
    if (toggleButton !== 'myinvoices') {
      await setToggleButton('myinvoices');
    }
  };

  const toggleAllInvoice = async () => {
    if (toggleButton !== 'allinvoices') {
      await setToggleButton('allinvoices');
    }
  };

  const getInvoices = () => {
    return invoiceList.map((invoice) => {
      return (
        <tr key={invoice._id}>
          <td>{invoice.number}</td>
          <td>{invoice.name}</td>
          <td>
            {CURRENCY} {invoice.amount}
          </td>
          <td>{invoice.mobile}</td>
          <td>{invoice.due_date}</td>
          {counterInvoice && counterInvoiceAccess ? (
            <td className="tac bold">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <td
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button onClick={() => handleViewInvoicePopupClick(invoice)}>
                    View
                  </Button>
                </td>
                {invoice.has_counter_invoice === false ? (
                  <span className="absoluteMiddleRight primary popMenuTrigger">
                    <i className="material-icons ">more_vert</i>
                    <div className="popMenu">
                      <span
                        onClick={() => {
                          handleCreateInvoicePopupClick(
                            'update',
                            invoice,
                            'counterinvoice',
                          );
                        }}
                      >
                        Create Counter Invoice
                      </span>
                    </div>
                  </span>
                ) : null}
              </div>
            </td>
          ) : (
              <td
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button onClick={() => handleViewInvoicePopupClick(invoice)}>
                  View
              </Button>
              </td>
            )}
        </tr>
      );
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setPage(0);
        SetCounterInvoice(false);
        setInvoiceList(paidRow);
        break;
      case 1:
        setPage(1);
        SetCounterInvoice(true);
        setInvoiceList(unpaidRow);
        break;
      case 2:
        setPage(2);
        SetCounterInvoice(false);
        setInvoiceList(draftRow);
        break;
      case 3:
        setPage(3);
        SetCounterInvoice(false);
        setInvoiceList(counterRow);
        break;
      default:
        SetCounterInvoice(false);
        if (value === 0) {
          setInvoiceList(paidRow);
        } else if (value === 1) {
          setInvoiceList(unpaidRow);
        } else {
          setInvoiceList(draftRow);
        }
        break;
    }
  };

  const deleteInvoice = (invoiceid) => {
    invoiceApi({}, { invoice_id: invoiceid }, 'delete').then((data) => {
      refreshInvoiceList(selectedGroupId);
      setViewInvoicePopup(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData() {

      const groups = await fetchGroups(merchantId);
      setGroupList(groups.list);
      setSelectedGroupId(groups.list[0]._id);
      setSelectedGroupName(groups.list[0].name);
      const stats = await fetchstaffStats(groups.list[0]._id);
      setStats(stats.stats);

      const access = await getinfo();
      setCounterInvoiceAccess(access.access);

      const invoices = await fetchInvoices(groups.list[0]._id);
      if (toggleButton === 'myinvoices') {
        const mylist = invoices.list.filter((invoice) => {
          return invoice.creator_id === positionId;
        });
        setInvoices(mylist);
      } else {
        const otherlist = invoices.list.filter((invoice) => {
          return invoice.creator_id !== positionId;
        });
        setInvoices(otherlist);
      }

      const offering = await fetchOfferingList();
      setOfferingList(offering.list);

      const tax = await fetchTaxList();
      setTaxList(tax.list);

      const setting = await getMerchantSettings();
      setDefaultBillPeriod(setting.default_bill_period);
      setBillTermList(setting.bill_term_list);
      if (setting.default_bill_term != undefined) {
        setDefaultBillTerm(setting.default_bill_term.name);
      }

      const country = await getCountries();
      setCountryList(country.list);

    }
    fetchData();
    setLoading(false);
    
  }, [toggleButton]);

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Invoice | Staff Position | E-WALLET </title>
      </Helmet>
      <StaffHeader active="dashboard" />
      <Container style={{ maxWidth: '1070px' }} verticalMargin>
      <Sidebar marginRight>
        <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
          <h4><b>Current Period: {defaultPeriod.period_name}</b></h4>
          <h4><b>Current Category: {selectedGroupName}</b></h4>
        <Row>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
          {
          stats.is_closed? (
              <Button
                dashBtn
                onClick={()=>generateOTP()}
              >
                  Open My Day
              </Button>
            ) : (
                <Button dashBtn disabled>
                  Day Opened At {new Date(stats.opening_time).getHours()}:{new Date(stats.opening_time).getMinutes()}
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
                  Day Closed
              </Button>
            ) : (
                <Button
                  dashBtn
                  onClick={() =>
                    handleCreateInvoicePopupClick('create', {}, 'invoice')
                  }
                >
                  Create Invoice
                </Button>
              )}
          </Col>
        </Row>
        <Row style={{ marginTop: '5px' }}>
          <Col style={{ width: '100%', marginTop: '5px' }} cw="100%">
          {
          stats.is_closed? (
              <Button
                dashBtn
                disabled
              >
                  Day Closed
              </Button>
            ) : (
                <Button
                  dashBtn
                  onClick={() => handleUploadInvoicePopupClick()}
                >
                  Upload Invoice
                </Button>
              )}
          </Col>
        </Row>
        <Row style={{ marginTop: '5px' }}>
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
        <Card marginBottom="54px" buttonMarginTop="32px" bigPadding smallValue>
        <h3>Categories</h3>
        {groupList.length > 0 ? (
          <div>
            {groupList.map((group,index)=>{
              return(
              <Button dashBtn
                style={{
                  marginTop:"5px",
                  backgroundColor: selectedGroupId === group._id ? "#5d87f1" : "#97bfee",
                }}
                onClick={()=>{changeGroup(group._id,group.name)}}
              >
                {group.name}
              </Button>
              );
            })}
        </div>
        ): " "}
        </Card>
      
      </Sidebar>
        
        <Main>
          <InvoiceCards raised={stats.bills_raised} paid={stats.bills_paid} counter={stats.counter_invoices} />
          <AmountCards raised={amountRaised} paid={amountPaid} pending={amountPending} counter={counterAmount} />
          <Card bigPadding>
            {counterInvoiceAccess ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  marginTop: '10px',
                }}
              >
                <Button
                  className={toggleButton === 'myinvoices' ? 'active' : ''}
                  onClick={toggleMyInvoice}
                  marginRight="5px"
                  padding="5px"
                >
                  My invoices
                </Button>
                <Button
                  className={toggleButton === 'allinvoices' ? 'active' : ''}
                  onClick={toggleAllInvoice}
                  marginLeft="20px"
                  style={{marginLeft:'10px'}}
                >
                  Other Invoices
                </Button>
              </div>
            ) : null}
            <div className="cardBody">
              <Grid container>
                <Tabs
                  style={{ width: '100%' }}
                  variant="scrollable"
                  scrollButtons="auto"
                  onChange={handleChange}
                  value={value}
                >
                  <TabItem
                    disableFocusRipple
                    disableRipple
                    label="Paid Invoices"
                  />
                  <TabItem label="Pending Invoices" />
                  <TabItem label="Draft Invoices" />
                  <TabItem label="Counter Invoices" />
                </Tabs>
              </Grid>
              {invoiceList && invoiceList.length > 0 ? (
                <Table marginTop="34px" smallTd>
                  <thead>
                    <tr>
                      <th>Bill No</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Mobile No</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{getInvoices()}</tbody>
                </Table>
              ) : (
                  <h3
                    style={{
                      textAlign: 'center',
                      color: 'grey',
                    }}
                  >
                    No invoice found
                  </h3>
                )}
            </div>
          </Card>
        </Main>
      </Container>
      <Footer bankname={bankName} banklogo={bankLogo}/>
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
      {createInvoicePopup ? (
        <CreateInvoicePopup
          onClose={() => onCreateInvoicePopupClose()}
          invoice={editingInvoice}
          taxlist={taxList}
          offeringlist={offeringList}
          groupId={selectedGroupId}
          grouplist={groupList}
          mode={mode}
          termlist={billTermList}
          countrylist={countryList}
          defaultterm={defaultTerm}
          defaultperiod={defaultPeriod}
          draftnumber={draftRow.length}
          refreshInvoiceList={() => {
            refreshInvoiceList(selectedGroupId);
            getStats(selectedGroupId);

          }}
          type={invoiceType}
        />
      ) : null}

      {uploadInvoicePopup ? (
        <UploadInvoicePopup
          groupId={selectedGroupId}
          groups={groupList}
          refreshInvoiceList={() => refreshInvoiceList(selectedGroupId)}
          onClose={() => onUploadInvoicePopupClose(selectedGroupId)}
        />
      ) : null}
      {viewInvoicePopup ? (
        <ViewInvoicePopup
          groupId={selectedGroupId}
          invoice={viewingInvoice}
          onClose={() => onViewInvoicePopupClose()}
          refreshInvoiceList={() => refreshInvoiceList(selectedGroupId)}
          edit={(type, i, m) => {
            handleCreateInvoicePopupClick(type, i, m);
          }}
          delete={(i) => {
            deleteInvoice(i);
          }}
        />
      ) : null}
    </Wrapper>
  );
}

export default InvoiceListPage;
