import React, { useEffect } from 'react';
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
import InvoiceCards from './InvoiceCards';
import CashierHeader from '../../shared/headers/cashier/CashierHeader';
import Tabs from '../../shared/Tabs';
import TabItem from '../../shared/TabItem';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import { fetchGroups, fetchInvoices, invoiceApi } from '../api/CashierAPI';

function InvoiceListPage(props) {
  const [createInvoicePopup, setCreateInvoicePopup] = React.useState(false);
  const [uploadInvoicePopup, setUploadInvoicePopup] = React.useState(false);
  const [invoiceList, setInvoiceList] = React.useState([]);
  const [invoiceType, setInvoiceType] = React.useState('new');
  const [editingInvoice, setEditingInvoice] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [allRow, setAllRow] = React.useState([]);
  const [paidRow, setPaidRow] = React.useState([]);
  const [unpaidRow, setUnpaidRow] = React.useState([]);
  const [groupList, setGroupList] = React.useState([]);
  const { match } = props;
  const { id } = match.params;
  localStorage.setItem('currentGroupId', id);

  const onCreateInvoicePopupClose = () => {
    setCreateInvoicePopup(false);
  };

  const handleCreateInvoicePopupClick = (type, invoice) => {
    setInvoiceType(type);
    setEditingInvoice(invoice);
    setCreateInvoicePopup(true);
  };
  const handleUploadInvoicePopupClick = () => {
    setUploadInvoicePopup(true);
  };

  const onUploadInvoicePopupClose = () => {
    setUploadInvoicePopup(false);
  };

  const setInvoices = (list) => {
    setInvoiceList(list);
    setAllRow(list);
    const paidRows = list.filter((invoice) => {
      return invoice.paid === 1;
    });
    const unpaidRows = list.filter((invoice) => {
      return invoice.paid === 0;
    });
    setPaidRow(paidRows);
    setUnpaidRow(unpaidRows);
  };

  const refreshInvoiceList = async () => {
    setLoading(true);
    fetchInvoices(id)
      .then((data) => {
        setInvoices(data.list);
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
          <td className="tac">
            {invoice.due_date}
            <span className="absoluteMiddleRight primary popMenuTrigger">
              <i className="material-icons ">more_vert</i>
              <div className="popMenu">
                <span
                  onClick={() =>
                    handleCreateInvoicePopupClick('update', invoice)
                  }
                >
                  Edit
                </span>
                <span
                  onClick={async () =>
                    invoiceApi(
                      {},
                      { invoice_id: invoice._id },
                      'delete',
                    ).then((data) => refreshInvoiceList())
                  }
                >
                  Delete
                </span>
              </div>
            </span>
          </td>
        </tr>
      );
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setInvoiceList(allRow);
        break;
      case 1:
        setPage(0);
        setInvoiceList(paidRow);
        break;
      case 2:
        setPage(0);
        setInvoiceList(unpaidRow);
        break;
      default:
        setInvoiceList(allRow);
    }
  };

  useEffect(() => {
    refreshInvoiceList();
    refreshGroupList();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Invoice | CASHIER | E-WALLET </title>
      </Helmet>
      <CashierHeader active="invoice" />
      <Container style={{ maxWidth: '1070px' }} verticalMargin>
        <Main fullWidth>
          <InvoiceCards />
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
                <Button
                  className="addBankButton"
                  flex
                  onClick={() => handleCreateInvoicePopupClick('create', {})}
                >
                  <AddIcon className="material-icons" />
                  <span>Create Invoice</span>
                </Button>
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
                    label="All Invoices"
                  />
                  <TabItem label="Paid Invoices" />
                  <TabItem label="Pending Invoices" />
                </Tabs>
              </Grid>
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Bill No</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Mobile No</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceList && invoiceList.length > 0 ? getInvoices() : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {createInvoicePopup ? (
        <CreateInvoicePopup
          onClose={() => onCreateInvoicePopupClose()}
          invoice={editingInvoice}
          groupId={id}
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
    </Wrapper>
  );
}

export default InvoiceListPage;
