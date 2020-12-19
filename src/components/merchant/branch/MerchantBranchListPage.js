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
import {
  blockMerchantBranch,
  fetchBranchList,
  fetchBranchListBySubzone,
  unblockMerchantBranch,
  getZoneDetails,
} from '../api/MerchantAPI';
import history from '../../utils/history';

function MerchantBranchListPage(props) {
  const [addBranchPopup, setAddBranchPopup] = React.useState(false);
  const [zoneName, setZoneName] = React.useState('');
  const [subzoneName, setSubzoneName] = React.useState('');
  const [branchList, setBranchList] = React.useState([]);
  const [copyBranchList, setCopyBranchList] = React.useState([]);

  const [popupType, setPopupType] = React.useState('new');
  const [editingBranch, setEditingBranch] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const { match } = props;
  const { id } = match.params;

  const handleBranchPopupClick = (type, merchant) => {
    setEditingBranch(merchant);
    setPopupType(type);
    setAddBranchPopup(true);
  };

  const handleBranchInfoClick = (branchInfo) => {
    localStorage.setItem(`selectedBranch`, JSON.stringify(branchInfo));
    history.push(`/merchant/branch/info/${branchInfo._id}`);
  };

  const onPopupClose = () => {
    setAddBranchPopup(false);
  };

  const refreshBranchList = async () => {
    setLoading(true);
    fetchBranchListBySubzone(id).then((data) => {
      setBranchList(data.list);
      setCopyBranchList(data.list)
      setLoading(data.loading);
    });
  };

  const refreshZoneDetails = async () => {
    setLoading(true);
    getZoneDetails().then((data) => {
      console.log(data);
      setZoneName(data.zone_name);
      setSubzoneName(data.subzone_name);
      setLoading(data.loading);
    });
  };

  useEffect(() => {
    refreshBranchList();
    refreshZoneDetails();
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
          {/* <td className="tac">{branch.total_cashiers}</td> */}
          <td className="tac">{branch.total_positions}</td>
          <td className="tac bold">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <td className="tac">{branch.username}</td>
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
                  {branch.status === 2 ? (
                    <span
                      onClick={() =>
                        unblockMerchantBranch(branch._id).then(() =>
                          refreshBranchList(),
                        )
                      }
                    >
                      Unblock
                    </span>
                  ) : (
                      <span
                        onClick={async () =>
                          blockMerchantBranch(branch._id).then(() => {
                            refreshBranchList();
                          })
                        }
                      >
                        Block
                      </span>
                    )}
                </div>
              </span>
            </div>
          </td>
        </tr>
      );
    });
  };

  const searchlistfunction = (value) => {
    console.log(value)
    // console.log(staff)
    console.log(branchList)

    const newfilterdata = copyBranchList.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );


    setBranchList(newfilterdata)


  }

  const { name } = JSON.parse(localStorage.getItem('currentZone'));

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Branches</title>
      </Helmet>
      <MerchantHeader page="info" goto="/merchant/dashboard" />
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
              <input type="text" placeholder="Search Branches" onChange={(e) => {
                searchlistfunction(e.target.value)
              }} />
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
                <h3>Branch List of {subzoneName}</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Branch Code</th>
                    <th>Total Staff Position</th>
                    <th>Branch Admin</th>
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
          subzonename={subzoneName}
          type={popupType}
          subzoneId={id}
          zone={localStorage.getItem('currentZone')}
          branch={editingBranch}
          refreshBranchList={(data) => refreshBranchList()}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
}

export default MerchantBranchListPage;
