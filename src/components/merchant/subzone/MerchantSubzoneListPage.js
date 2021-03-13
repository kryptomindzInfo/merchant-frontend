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
import { fetchSubzoneListByZone, getZoneDetails, checkSubZoneStats } from '../api/MerchantAPI';
import history from '../../utils/history';

function MerchantSubzoneListPage(props) {
  const [addSubzonePopup, setAddSubzonePopup] = React.useState(false);
  const [subzoneList, setSubzoneList] = React.useState([]);
  const [copySubzoneList, setCopySubzoneList] = React.useState([])
  const [popupType, setPopupType] = React.useState('new');
  const [zoneName, setZoneName] = React.useState('');
  const [subzoneName, setSubzoneName] = React.useState('');
  const [subzonestats, setSubZoneStats] = React.useState([]);
  const [editingSubzone, setEditingSubzone] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const { match } = props;
  const { id } = match.params;
  console.log(id)

  const handleSubzonePopupClick = (type, subzone) => {
    setEditingSubzone(subzone);
    setPopupType(type);
    setAddSubzonePopup(true);
  };

  const onPopupClose = () => {
    setAddSubzonePopup(false);
  };

  const getSubZoneStats = async(list) => {
    const statlist = list.map(async (subzone) => {
        const data = await checkSubZoneStats(subzone._id);
        return (data);
    })
    const result= await Promise.all(statlist);
    return({res:result, loading:false});
  }

  const refreshSubZoneList = async () => {
    setLoading(true)
    const subzonedetails = await getZoneDetails();
    setZoneName(subzonedetails.zone_name);
    setSubzoneName(subzonedetails.subzone_name);
    const subzonelist = await fetchSubzoneListByZone(id);
    setSubzoneList(subzonelist.list);
    const subzonestats = await getSubZoneStats(subzonelist.list);
    setSubZoneStats(subzonestats.res);
    setLoading(subzonestats.loading);
  };

  useEffect(() => {
    refreshSubZoneList();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }

  const getSubzoneList = () => {
    return subzoneList.map((subzone,index) => {
      return (
        <tr key={subzone._id}>
          <td className="tac">{subzone.name}</td>
          <td
            className="tac popMenuTrigger"
            onClick={() => {
              localStorage.setItem('selectedSubzone', subzone._id);
              localStorage.setItem(
                'currentSubzone',
                JSON.stringify(subzone),
              );
              history.push(`/merchant/${subzone._id}/branches`);
            }}
          >{subzone.branch_count}</td>
           <td className="tac">{subzonestats[index].bill_generated}</td>
          <td className="tac">{subzonestats[index].amount_generated}</td>
          <td className="tac">{subzonestats[index].bill_paid}</td>
          <td className="tac">{subzonestats[index].amount_paid}</td>
          <td className="tac">{subzonestats[index].bill_generated-subzonestats[index].bill_paid}</td>
          <td className="tac bold">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
               <td className="tac">{subzonestats[index].amount_generated-subzonestats[index].amount_paid}</td>
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
                  <span
                    onClick={() => handleSubzonePopupClick('update', subzone)}
                  >
                    Edit
                  </span>
                </div>
              </span>
            </div>
          </td>
        </tr>
      );
    });
  };

  const { name } = JSON.parse(localStorage.getItem('currentZone'));

  const searchlistfunction = (value) => {
    console.log(value)
    // console.log(staff)
    // console.log(branchList)

    const newfilterdata = copySubzoneList.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );


    setSubzoneList(newfilterdata)


  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Subzones</title>
      </Helmet>
      <MerchantHeader page="info" goto="/merchant/dashboard" />
      <Container verticalMargin>
        <MerchantSideBar showClaimButton />
        {/* <Main>
         
        </Main> */}
        <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">
                <SearchIcon />
              </i>
              <input type="text" placeholder="Search Subzone" onChange={(e) => {
                searchlistfunction(e.target.value)
              }} />
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
            {/* <div className="cardHeader">
              <div className="cardHeaderLeft">
                <SupervisedUserCircleIcon className="material-icons" />
              </div>
              <div className="cardHeaderRight">
                <h3>
                  {subzoneName} List of {zoneName}
                </h3>
              </div>
            </div> */}
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Subzones</th>
                    <th>No. of branches</th>
                    <th>No. of Bills</th>
                    <th>Amount Billed</th>
                    <th>No. of paid bills</th>
                    <th>Amount of paid bills</th>
                    <th>No. of pending bills</th>
                    <th>Amount of pending bills</th>
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
       
      </Container>
      {addSubzonePopup ? (
        <CreateSubzonePopup
          type={popupType}
          zoneId={id}
          subzone={editingSubzone}
          subzonename={subzoneName}
          refreshSubzoneList={(data) => refreshSubzoneList(data)}
          zonename={zoneName}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
}

export default MerchantSubzoneListPage;
