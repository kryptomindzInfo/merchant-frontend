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
import PaidInvoiceDetails from '../../shared/sidebars/PaidInvoiceDetails';
import Card from '../../shared/Card';
import Table from '../../shared/Table';
import ReactPaginate from 'react-paginate';
import Main from '../../shared/Main';
import Wrapper from '../../shared/Wrapper';
import Container from '../../shared/Container';
import Button from '../../shared/Button';
import { fetchPaidInvoices } from '../api/CashierAPI';
import { CURRENCY } from '../../constants';


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
  const [viewInvoicePopup, setViewInvoicePopup] = React.useState(false);
  const [viewingInvoice, setViewingInvoice] = React.useState({});
  const [pagecount, setPageCount ] = React.useState(0);
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceListCopy, setInvoiceListCopy] = useState([]);


  const refreshInvoiceList = () => {
    fetchPaidInvoices()
      .then((data) => {
        const invoice = data.list.reverse();
        setPageCount(Math.ceil(data.list.length / 10));
        setInvoiceList(invoice.slice(0,10));
        setInvoiceListCopy(invoice)
        props.setLoading(false);
        props.invoice(invoice);
      })
      .catch((err) => {
        props.setLoading(false);
      });
  };

  const handleViewInvoicePopupClick = (invoice) => {
    setViewingInvoice(invoice);
    setViewInvoicePopup(true);
  };

  const onViewInvoicePopupClose = () => {
    setViewInvoicePopup(false);
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
        </tr>
      );
    });
  };
  const handlePageClick = (data) =>{
    console.log(data);
    setInvoiceList(invoiceListCopy.slice(data.selected*10, data.selected + 10));
  };

  const searchlistfunction = (value) => {
    console.log(value)


    const newfilterdata = copyInvoiceList.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );


    setInvoiceList(newfilterdata)


  }

  return (
    <Wrapper>
      <Container verticalMargin>
        <Main fullWidth>
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
                <h5>List of your paid invoices</h5>
              </div>
            </div>
            <div className="cardBody">
              {invoiceList && invoiceList.length > 0 ? (
              <div>
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
                  <tbody>{getInvoices()}</tbody>
                </Table>
               <ReactPaginate
               previousLabel={'previous'}
               nextLabel={'next'}
               breakLabel={'...'}
               breakClassName={'break-me'}
               pageCount={pagecount}
               marginPagesDisplayed={10}
               pageRangeDisplayed={2}
               onPageChange={handlePageClick}
               containerClassName={'pagination'}
               subContainerClassName={'pages pagination'}
               activeClassName={'active'}
             />
             </div>
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
      {viewInvoicePopup ? (
          <PaidInvoiceDetails
            close={()=>onViewInvoicePopupClose()}
            invoice={viewingInvoice}
          />
      ) : (
          ''
      )}
    </Wrapper>
  );
};

export default InvoiceListCard;
