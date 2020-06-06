import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Loader from '../../shared/Loader';
import Container from '../../shared/Container';
import ActionBar from '../../shared/ActionBar';
import Table from '../../shared/Table';
import Main from '../../shared/Main';
import CreateBranchPopup from './CreateBranchPopup';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import MerchantSideBar from '../../shared/sidebars/MerchantSideBar';
import { fetchBranchList } from '../api/MerchantAPI';
import history from '../../utils/history';

function MerchantBranchListPage() {
  const [addBranchPopup, setAddBranchPopup] = React.useState(false);
  const [branchList, setBranchList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingBranch, setEditingBranch] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);

  const handleBranchPopupClick = (type, merchant) => {
    setEditingBranch(merchant);
    setPopupType(type);
    setAddBranchPopup(true);
  };

  const handleBranchInfoClick = (branchInfo) => {
    localStorage.setItem(
      `${branchInfo.name}_branchInfo`,
      JSON.stringify(branchInfo),
    );
    history.push(`/merchant/branch/info/${branchInfo.name}`);
  };

  const onPopupClose = () => {
    setAddBranchPopup(false);
  };

  const refreshBranchList = async () => {
    const data = await fetchBranchList();
    setBranchList(data.list);
    setLoading(data.loading);
  };

  useEffect(() => {
    setLoading(true);
    const getBranchList = async () => {
      const data = await fetchBranchList();
      setBranchList(data.list);
      setLoading(data.loading);
    };
    getBranchList();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }

  const getBranchList = () => {
    return branchList.map((branch) => {
      return (
        <tr key={branch._id}>
          <td className="tac">{branch.name}</td>
          <td className="tac">{branch.code}</td>
          <td className="tac">{branch.total_cashiers}</td>
          <td className="tac">{branch.username}</td>
          <td className="tac bold">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <td className="tac">{branch.zone_id}</td>
              <span className="absoluteMiddleRight primary popMenuTrigger">
                <i className="material-icons ">more_vert</i>
                <div className="popMenu">
                  <span onClick={() => handleBranchInfoClick(branch)}>
                    Info
                  </span>
                  <span
                    onClick={() => handleBranchPopupClick('update', branch)}
                  >
                    Edit
                  </span>
                  {branch.status === -1 ? (
                    <span>Unblock</span>
                  ) : (
                    <span>Block</span>
                  )}
                </div>
              </span>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Branches</title>
      </Helmet>
      <MerchantHeader active="branch" />
      <Container verticalMargin>
        <MerchantSideBar showClaimButton />
        <Main>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">
                <SearchIcon />
              </i>
              <input type="text" placeholder="Search Merchants" />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handleBranchPopupClick('new', {})}
            >
              <AddIcon className="material-icons" />
              <span>Add Branch</span>
            </Button>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <SupervisedUserCircleIcon className="material-icons" />
              </div>
              <div className="cardHeaderRight">
                <h3>Branch List</h3>
                <h5>Your friends and family</h5>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Branch Code</th>
                    <th>Total Cashiers</th>
                    <th>Branch Admin</th>
                    <th>Zone ID</th>
                  </tr>
                </thead>
                <tbody>
                  {branchList && branchList.length > 0 ? getBranchList() : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addBranchPopup ? (
        <CreateBranchPopup
          type={popupType}
          branch={editingBranch}
          refreshBranchList={(data) => refreshBranchList()}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
}

export default MerchantBranchListPage;
