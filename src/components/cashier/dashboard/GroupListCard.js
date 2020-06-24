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
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import AddIcon from '@material-ui/icons/Add';
import Card from '../../shared/Card';
import Table from '../../shared/Table';
import ActionBar from '../../shared/ActionBar';
import Main from '../../shared/Main';
import Wrapper from '../../shared/Wrapper';
import Container from '../../shared/Container';
import CreateGroupPopup from './CreateGroupPopup';
import Button from '../../shared/Button';
import history from '../../utils/history';

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

const GroupListCard = (props) => {
  const [addGroupPopup, setGroupPopup] = useState(false);
  const [popupType, setPopupType] = useState('create');
  const [editingGroup, setEditingGroup] = useState({});
  const [groupList, setGroupList] = useState(props.groupList);

  const handleGroupPopupClick = (type, group) => {
    setEditingGroup(group);
    setPopupType(type);
    setGroupPopup(true);
  };

  const getGroups = () => {
    return groupList.map((group) => {
      return (
        <tr key={group.name}>
          <td>{group.name}</td>
          <td>{group.bills_raised}</td>
          <td>{group.bills_paid}</td>
          <td>{group.bills_raised - group.bills_paid}</td>
          <td>
            <span
              className="tac"
              style={{ cursor: 'pointer', color: '#417505' }}
              onClick={() => {
                history.push(`/cashier/${group._id}/invoices`);
              }}
            >
              {' '}
              View{' '}
            </span>
          </td>
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
              <input type="text" placeholder="Search Groups" />
            </div>
            <Button
              className="addBankButton"
              flex
              onClick={() => handleGroupPopupClick('create', {})}
            >
              <AddIcon className="material-icons" />
              <span>Add Category</span>
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
                <h3>Category List</h3>
                <h5>List of your Categories</h5>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>No. of Invoices</th>
                    <th>No. of Paid Invoices</th>
                    <th>No. of Due Invoices</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {groupList && groupList.length > 0 ? getGroups() : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addGroupPopup ? (
        <CreateGroupPopup
          type={popupType}
          group={editingGroup}
          refreshGroupList={() => props.refreshGroupList()}
          onClose={() => setGroupPopup(false)}
        />
      ) : null}
    </Wrapper>
  );
};

export default GroupListCard;
