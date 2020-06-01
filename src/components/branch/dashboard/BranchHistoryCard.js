import React, { Fragment, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
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
import TabItem from '../../shared/TabItem';
import Tabs from '../../shared/Tabs';
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

const BranchHistoryCard = () => {
  const classes = useStyles();
  const [rows, setRow] = useState([]);
  const [allRow, setAllRow] = useState([]);
  const [transferRow, setTransferRow] = useState([]);
  const [receiveRow, setReceiveRow] = useState([]);
  const [value, setValue] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function historyRows() {
    return rows.length > 0 ? (
      rows.map((history, index) => (
        <tr key={history._id}>
          <td>{history.bill_no}</td>
          <td>{history.name}</td>
          <td className="tac">
            {CURRENCY} {history.amount.toFixed(2)}
          </td>
        </tr>
      ))
    ) : (
      <TableRow style={{ height: 40 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
    );
  }

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
            fontSize="large"
            style={{ color: '#417505' }}
          />
        </div>
        <div className="cardHeaderRight">
          <h3>Cashier Activity</h3>
          <h5>Daily activity</h5>
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
              label="All"
              className={classes.allTab}
            />
            <TabItem label="Payment Sent" className={classes.tab} />
            <TabItem label="Payment Recieved" className={classes.tab} />
          </Tabs>
        </Grid>
        <Grid container className={classes.paper}>
          <TableContainer style={{ color: '#417505', border: 'none' }}>
            <Table
              aria-label="custom pagination table"
              style={{ color: '#417505', border: 'none' }}
            >
              <TableBody style={{ color: '#417505', border: 'none' }}>
                {historyRows()}
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
                    count={rows.length}
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

export default BranchHistoryCard;
