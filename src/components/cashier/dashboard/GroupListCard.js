import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Card from '../../shared/Card';
import Table from '../../shared/Table';

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

const GroupListCard = () => {
  const classes = useStyles();
  const [fullRow, setRow] = useState([]);
  const [allRow, setAllRow] = useState([]);
  const [transferRow, setTransferRow] = useState([]);
  const [receiveRow, setReceiveRow] = useState([]);
  const [value, setValue] = useState(0);
  const [groupList, setGroupList] = useState([
    {
      name: 'Group 1',
      total_invoice: '100',
      paid_invoice: '30',
      due_invoice: '70',
    },
  ]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, fullRow.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setRow(allRow);
        break;
      case 1:
        setPage(0);
        setRow(transferRow);
        break;
      case 2:
        setPage(0);
        setRow(receiveRow);
        break;
      default:
        setRow(allRow);
    }
  };

  const getGroups = () => {
    return groupList.map((group) => {
      return (
        <tr key={group.name}>
          <td>{group.name}</td>
          <td>{group.total_invoice}</td>
          <td>{group.paid_invoice}</td>
          <td>
            {group.paid_invoice}
            <span> View </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <Card bigPadding>
      <div className="cardHeader">
        <div className="cardHeaderLeft">
          <SupervisedUserCircleIcon
            style={{ color: '#417505', fontSize: '50' }}
            className="material-icons"
          />
        </div>
        <div className="cardHeaderRight" style={{ paddingLeft: '10px' }}>
          <h3>Group List</h3>
          <h5>List of your groups</h5>
        </div>
      </div>
      <div className="cardBody">
        {/*  <Grid container>
          <DashBoardTabs
            style={{ width: '100%' }}
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
            value={value}
          >
            <DashboardTab
              disableFocusRipple
              disableRipple
              label="All"
              className={classes.allTab}
            />
            <DashboardTab label="Payment Recieved" className={classes.tab} />
            <DashboardTab label="Payment Pending" className={classes.tab} />
          </DashBoardTabs>
        </Grid> */}

        <Table marginTop="34px" smallTd>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>No. of Invoices</th>
              <th>No. of Paid Invoices</th>
              <th>No. of Due Invoices</th>
            </tr>
          </thead>
          <tbody>
            {groupList && groupList.length > 0 ? getGroups() : null}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default GroupListCard;
