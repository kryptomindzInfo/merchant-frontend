import React, { Fragment, useState } from 'react';
import {
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  withStyles,
  TableHead,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import { PlaylistAddCheckRounded } from '@material-ui/icons';
import Card from '../../shared/Card';

const DashBoardTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#417505',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const DashboardTab = withStyles((theme) => ({
  root: {
    margin: '1%',
    color: '#417505',
    textAlign: 'center',
    width: '50%',
    textTransform: 'none',
    fontSize: 21,
    outline: 0,
    fontWeight: theme.typography.fontWeightBold,
  },
  selected: {
    '&$selected': {
      outline: 'none',
      border: 'none',
    },
  },
}))((props) => <Tab disableRipple {...props} />);

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

const CashierHistoryCard = () => {
  const classes = useStyles();
  const [fullRow, setRow] = useState([]);
  const [allRow, setAllRow] = useState([]);
  const [transferRow, setTransferRow] = useState([]);
  const [receiveRow, setReceiveRow] = useState([]);
  const [value, setValue] = useState(0);
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
  return (
    <Card bigPadding>
      <div className="cardHeader">
        <div className="cardHeaderLeft">
          <PlaylistAddCheckRounded
            style={{ color: '#417505', fontSize: '50' }}
          />
        </div>
        <div className="cardHeaderRight" style={{ paddingLeft: '10px' }}>
          <h3>Cashier Activity</h3>
        </div>
      </div>
      <div className="cardBody">
        <Grid container>
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
        </Grid>
        <Grid container className={classes.paper}>
          <TableContainer style={{ color: '#417505', border: 'none' }}>
            <Table
              aria-label="custom pagination table"
              style={{ color: '#417505', border: 'none' }}
            >
              <TableHead>
                <TableRow style={{ background: 'orange' }}>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: '#fff' }}>
                      Group Name
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: '#fff' }}>
                      No of Invoices
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: '#fff' }}>
                      No of Paid Invoices
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: '#fff' }}>
                      No of Due Invoices
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: '#417505', border: 'none' }}>
                {/* {rowsPerPage.map((row,index) => ( */}
                <TableRow
                  style={{ color: '#417505', borderColor: 'transparent' }}
                >
                  <TableCell align="center">
                    <Typography variant="subtitle1">Jp</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" noWrap>
                      50
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">45</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1"> 5</Typography>
                  </TableCell>
                </TableRow>
                {/* ))} */}
                {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    style={{ color: '#417505', border: 'none' }}
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    count={fullRow.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </div>
    </Card>
  );
};

export default CashierHistoryCard;
