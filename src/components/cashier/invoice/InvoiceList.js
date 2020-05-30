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

function InvoiceList(props) {
  const { match } = props;
  const { branchName: groupName } = match.params;
  const [createInvoicePopup, setCreateInvoicePopup] = React.useState(false);
  const [uploadInvoicePopup, setUploadInvoicePopup] = React.useState(false);
  const [invoiceList, setInvoiceList] = React.useState([]);
  const [invoiceType, setInvoiceType] = React.useState('new');
  const [editingInvoice, setEditingInvoice] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);

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

  const getInvoices = () => {
    return invoiceList.map((invoice) => {
      return (
        <tr key={invoice._id}>
          <td>{invoice.bill_no}</td>
          <td>{invoice.name}</td>
          <td className="tac">
            {CURRENCY} {invoice.amount.toFixed(2)}
            <span className="absoluteMiddleRight primary popMenuTrigger">
              <i className="material-icons ">more_vert</i>
              <div className="popMenu">
                <span onClick={() => handleCreateInvoicePopupClick({})}>
                  Edit
                </span>
                <span>Delete</span>
              </div>
            </span>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    const getInvoiceList = () => {
      const invoices = [
        {
          _id: 'sdsdsd',
          name: 'Yusuf',
          amount: 100,
          bill_no: 1,
        },
      ];
      setInvoiceList(invoices);
    };
    getInvoiceList();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <Wrapper from="merchant">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${groupName} | Invoice`}</title>
      </Helmet>
      <CashierHeader active="invoice" branchName={groupName} />
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '30px',
              }}
            >
              <Button
                className="addBankButton"
                flex
                style={{ marginBottom: '30px' }}
                onClick={() => handleCreateInvoicePopupClick('new', {})}
              >
                <AddIcon className="material-icons" />
                <span>Create Invoice</span>
              </Button>
              <Button
                className="addBankButton"
                flex
                onClick={() => handleUploadInvoicePopupClick()}
              >
                <AddIcon className="material-icons" />
                <span>Upload Invoice</span>
              </Button>
            </div>
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
        />
      ) : null}

      {uploadInvoicePopup ? (
        <UploadInvoicePopup onClose={() => onUploadInvoicePopupClose()} />
      ) : null}
    </Wrapper>
  );
}

export default InvoiceList;
