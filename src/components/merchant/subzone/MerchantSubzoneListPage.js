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
import CreateSubzonePopup from './CreateSubzonePopup';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import MerchantSideBar from '../../shared/sidebars/MerchantSideBar';
import { fetchSubzoneListByZone, getZoneDetails } from '../api/MerchantAPI';
import history from '../../utils/history';

function MerchantSubzoneListPage(props) {
  const [addSubzonePopup, setAddSubzonePopup] = React.useState(false);
  const [subzoneList, setSubzoneList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [zoneName, setZoneName] = React.useState('');
  const [subzoneName, setSubzoneName] = React.useState('');
  const [editingSubzone, setEditingSubzone] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const { match } = props;
  const { id } = match.params;

  const handleSubzonePopupClick = (type, subzone) => {
    setEditingSubzone(subzone);
    setPopupType(type);
    setAddSubzonePopup(true);
  };

  const onPopupClose = () => {
    setAddSubzonePopup(false);
  };

  const refreshSubzoneList = async () => {
    setLoading(true);
    fetchSubzoneListByZone(id).then((data) => {
      setSubzoneList(data.list);
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
    refreshSubzoneList();
    refreshZoneDetails();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }

  const getSubzoneList = () => {
    return subzoneList.map((subzone) => {
      return (
        <tr key={subzone._id}>
          <td className="tac">{subzone.name}</td>
          <td className="tac">{subzone.code}</td>
          <td className="tac bold">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <td className="tac">
                {subzone.branch_count
                  ? subzone.branch_count
                  : 'No branch found'}
              </td>
              <span className="absoluteMiddleRight primary popMenuTrigger">
                <i className="material-icons ">more_vert</i>
                <div className="popMenu">
                  <span
                    onClick={() => {
                      localStorage.setItem('selectedSubzone', subzone._id);
                      localStorage.setItem(
                        'currentSubzone',
                        JSON.stringify(subzone),
                      );
                      history.push(`/merchant/${subzone._id}/branches`);
                    }}
                  >
                    <span>Branches</span>
                  </span>
                  {/* <span onClick={() => handleZonePopupClick('update', zone)}>
                    Edit
                  </span> */}
                </div>
              </span>
            </div>
          </td>
        </tr>
      );
    });
  };

  const { name } = JSON.parse(localStorage.getItem('currentZone'));

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Subzones</title>
      </Helmet>
      <MerchantHeader
        page="info"
        middleTitle={zoneName}
        goto="/merchant/dashboard"
      />
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
              onClick={() => handleSubzonePopupClick('new', {})}
            >
              <AddIcon className="material-icons" />
              <span>Add {subzoneName}</span>
            </Button>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <SupervisedUserCircleIcon className="material-icons" />
              </div>
              <div className="cardHeaderRight">
                <h3>{subzoneName} List</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>{subzoneName} Code</th>
                    <th>Total Branches</th>
                  </tr>
                </thead>
                <tbody>
                  {subzoneList && subzoneList.length > 0
                    ? getSubzoneList()
                    : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addSubzonePopup ? (
        <CreateSubzonePopup
          type={popupType}
          zoneId={id}
          subzone={editingSubzone}
          subzonename={subzoneName}
          refreshSubzoneList={(data) => refreshSubzoneList(data)}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
}

export default MerchantSubzoneListPage;
