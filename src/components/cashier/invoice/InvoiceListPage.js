import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Wrapper from '../../shared/Wrapper';
import Loader from '../../shared/Loader';
import Container from '../../shared/Container';
import ActionBar from '../../shared/ActionBar';
import Table from '../../shared/Table';
import Main from '../../shared/Main';
import Card from '../../shared/Card';
import { CURRENCY } from '../../constants';
import Button from '../../shared/Button';
import CreateInvoicePopup from './CreateInvoicePopup';
import UploadInvoicePopup from './UploadInvoicePopup';
import ViewInvoicePopup from './ViewInvoicePopup';
import InvoiceCards from './InvoiceCards';
import StaffHeader from '../../shared/headers/cashier/StaffHeader';
import Tabs from '../../shared/Tabs';
import TabItem from '../../shared/TabItem';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import notify from '../../utils/Notify';
import {
  fetchGroups,
  fetchStats,
  fetchInvoices,
  invoiceApi,
  fetchTaxList,
  fetchOfferingList,
  getMerchantSettings,
  getCountries,
  getinfo,
} from '../api/CashierAPI';

function InvoiceListPage(props) {
  const [createInvoicePopup, setCreateInvoicePopup] = React.useState(false);
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
  const { match } = props;
  const { id } = match.params;
  const groupName = localStorage.getItem('currentGroupName');
  localStorage.setItem('currentGroupId', id);

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

  const getCountryList = async () => {
    setLoading(true);
    getCountries().then((data) => {
      setCountryList(data.list);
      setLoading(false);
    });
  };

  const refreshMerchantSettings = async () => {
    setLoading(true);
    getMerchantSettings().then((data) => {
      setDefaultBillPeriod(data.default_bill_period);
      setBillTermList(data.bill_term_list);
      if (data.default_bill_term != undefined) {
        setDefaultBillTerm(data.default_bill_term.name);
      }
      setLoading(data.loading);
    });
  };
  const getStats = () => {
    setLoading(true);
    fetchStats('staff')
      .then((data) => {
        setCounterClose(data.stats.is_closed);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const refreshInfo = async () => {
    setLoading(true);
    getinfo().then((data) => {
      setCounterInvoiceAccess(data.access);
      setLoading(false);
    });
  };

  const getTaxList = async () => {
    setLoading(true);
    fetchTaxList().then((data) => {
      setTaxList(data.list);
      setLoading(data.loading);
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
    setCounterRow(counterRows.reverse());
    setInvoiceList(paidRows.reverse());
    setPaidRow(paidRows.reverse());
    setUnpaidRow(unpaidRows.reverse());
    setDraftRow(draftRows.reverse());
  };

  const refreshInvoiceList = async () => {
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

  const refreshGroupList = () => {
    setLoading(true);
    fetchGroups()
      .then((data) => {
        setGroupList(
          data.list.filter((group) => {
            return group._id === id;
          }),
        );
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

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
      refreshInvoiceList();
      setViewInvoicePopup(false);
    });
  };

  useEffect(() => {
    getStats();
    refreshInvoiceList();
    refreshInfo();
    refreshGroupList();
    getOfferingList();
    getTaxList();
    refreshMerchantSettings();
    getCountryList();
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
      <StaffHeader active="invoice" />
      <Container style={{ maxWidth: '1070px' }} verticalMargin>
        <Main fullWidth>
          <InvoiceCards paid={paidRow.length} unpaid={unpaidRow.length} />
          <ActionBar
            style={{ display: 'flex', alignItems: 'center' }}
            marginBottom="33px"
            inputWidth="100%"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">
                <SearchIcon />
              </i>
              <input type="text" placeholder="Search Invoices" />
            </div>
            <Row justify="space-between" mL="30px">
              <Col cW="100%">
                {counterClose ? (
                  <Button
                  className="addBankButton"
                  flex
                  disabled
                >
                  <AddIcon className="material-icons" />
                  <span>Create Invoice</span>
                </Button>
                  
                ): (
                  <Button
                  className="addBankButton"
                  flex
                  onClick={() =>
                    handleCreateInvoicePopupClick('create', {}, 'invoice')
                  }
                >
                  <AddIcon className="material-icons" />
                  <span>Create Invoice</span>
                </Button>
                )}
                
              </Col>
              <Col cW="100%">
                <Button
                  className="addBankButton"
                  flex
                  onClick={() => handleUploadInvoicePopupClick()}
                >
                  <AddIcon className="material-icons" />
                  <span>Upload Invoice</span>
                </Button>
              </Col>
            </Row>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <SupervisedUserCircleIcon className="material-icons" />
              </div>
              <div className="cardHeaderRight">
                <h3>Invoice List</h3>
                <h5>List of your invoices</h5>
              </div>
            </div>
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
      {createInvoicePopup ? (
        <CreateInvoicePopup
          onClose={() => onCreateInvoicePopupClose()}
          invoice={editingInvoice}
          taxlist={taxList}
          offeringlist={offeringList}
          groupId={id}
          mode={mode}
          termlist={billTermList}
          countrylist={countryList}
          defaultterm={defaultTerm}
          defaultperiod={defaultPeriod}
          draftnumber={draftRow.length}
          refreshInvoiceList={() => {
            refreshInvoiceList();
          }}
          type={invoiceType}
        />
      ) : null}

      {uploadInvoicePopup ? (
        <UploadInvoicePopup
          groupId={id}
          groups={groupList}
          refreshInvoiceList={() => refreshInvoiceList()}
          onClose={() => onUploadInvoicePopupClose()}
        />
      ) : null}
      {viewInvoicePopup ? (
        <ViewInvoicePopup
          groupId={id}
          invoice={viewingInvoice}
          onClose={() => onViewInvoicePopupClose()}
          refreshInvoiceList={() => refreshInvoiceList()}
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
