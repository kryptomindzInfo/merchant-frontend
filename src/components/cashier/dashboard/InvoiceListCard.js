import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import AddIcon from '@material-ui/icons/Add';
import Card from '../../shared/Card';
import Table from '../../shared/Table';
import ActionBar from '../../shared/ActionBar';
import Main from '../../shared/Main';
import Wrapper from '../../shared/Wrapper';
import Container from '../../shared/Container';
import CreateGroupPopup from './CreateGroupPopup';
import PayBillPopup from '../../cashier/MerchantPayBills/PayBillPopup';
import Button from '../../shared/Button';
import history from '../../utils/history';
import { fetchPaidInvoices } from '../api/CashierAPI';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '2%',
    width: '100%',
  },
  allTab: {
    textAlign: 'center',
    width: '10%',
  },
  tab: {
    textAlign: 'center',
    width: '50%',
  },
  iconSelected: {
    color: '#417505',
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Fragment>
      <IconButton
        onClick={handleFirstPageButtonClick}
        className={page !== 0 ? classes.iconSelected : ''}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        className={page !== 0 ? classes.iconSelected : ''}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        className={
          page >= Math.ceil(count / rowsPerPage) - 1 ? '' : classes.iconSelected
        }
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        className={
          page >= Math.ceil(count / rowsPerPage) - 1 ? '' : classes.iconSelected
        }
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Fragment>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const InvoiceListCard = (props) => {
  const [addGroupPopup, setGroupPopup] = useState(false);
  const [payBillsPopup, setPayBillsPopup] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);

  const onPayBillsPopupClose = () => {
    setPayBillsPopup(false);
  };

  const onPayBillsPopupOpen = () => {
    setPayBillsPopup(true);
  }; 

  const refreshInvoiceList = () => {
    fetchPaidInvoices()
      .then((data) => {
        setInvoiceList(data.list);
        props.setLoading(false);
        props.invoice(data.list);
      })
      .catch((err) => {
        props.setLoading(false);
      });
  };

  useEffect(() => {
    refreshInvoiceList();
  }, []);

  const handleGroupPopupClick = (type, group) => {
    setEditingGroup(group);
    setPopupType(type);
    setGroupPopup(true);
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
          {/* {counterInvoice && counterInvoiceAccess ? (
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
          )} */}
        </tr>
      );
    });
  };

  return (
    <Wrapper>
      <Container verticalMargin>
        <Main fullWidth>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">
                <SearchIcon />
              </i>
              <input type="text" placeholder="Search Invoices" />
            </div>
            <Button
              className="addBankButton"
              flex
              onClick={() => {onPayBillsPopupOpen()}}
            >
              <AddIcon className="material-icons" />
              <span>Pay Invoices</span>
            </Button>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <SupervisedUserCircleIcon
                  style={{ color: '#417505', fontSize: '50' }}
                  className="material-icons"
                />
              </div>
              <div className="cardHeaderRight" style={{ paddingLeft: '10px' }}>
                <h3>Paid Invoices</h3>
                <h5>List of your Categories</h5>
              </div>
            </div>
            <div className="cardBody">
            {invoiceList && invoiceList.length > 0 ? (
                <Table marginTop="34px" smallTd>
                  <thead>
                    <tr>
                      <th>Invoice No</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Mobile No</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {/* <tbody>{getInvoices()}</tbody> */}
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
      {payBillsPopup ? (
        <PayBillPopup close={() => onPayBillsPopupClose()} />
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default InvoiceListCard;
