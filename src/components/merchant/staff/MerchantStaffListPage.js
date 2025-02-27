import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import ActionBar from '../../shared/ActionBar';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Grid from '@material-ui/core/Grid';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import CreateStaffPopup from './CreateStaffPopup';
import { CONTRACT_URL, STATIC_URL } from '../../constants';
import MerchantSideBar from '../../shared/sidebars/MerchantSideBar';
import { blockStaffAPI, fetchStaffList } from '../api/MerchantAPI';
import Loader from '../../shared/Loader';

const MerchantStaffListPage = () => {
  const [staff, setStaff] = useState([]);
  const id = JSON.parse(localStorage.getItem('merchantLogged')).details._id;
  const admin = JSON.parse(localStorage.getItem('merchantLogged')).admin;
  const [staffCopy, setStaffCopy] = useState([]);
  const [showStaffPopup, setStaffPopup] = useState(false);
  const [popupType, setPopupType] = React.useState('new');
  const [isLoading, setLoading] = React.useState(false);
  const [editingStaff, setEditingStaff] = React.useState({});

  const handleStaffPopupClick = (type, staffObj) => {
    setEditingStaff(staffObj);
    setPopupType(type);
    setStaffPopup(true);
  };

  const refreshStaffList = async () => {
    setLoading(true);
    const data = await fetchStaffList(id);
    console.log(data);
    setStaff(data.list);
    setStaffCopy(data.list)
    setLoading(data.loading);
  };

  const onPopupClose = () => {
    setStaffPopup(false);
  };

  useEffect(() => {
    refreshStaffList();
  }, []);

  const mappedCards = () => {
    return staff.map((b) => {
      if (!b.isAdmin) {
        const pic =
          b.logo && b.logo !== '' && b.logo !== undefined
            ? STATIC_URL + b.logo
            : `${CONTRACT_URL}main/default-profile.png`;
        return (
          
          <Grid item md={3} sm={6} xs={12} style={{marginTop:"10px"}}>
            <Card key={b._id} col horizontalMargin="10px" cardWidth="192px">
            <div className="profile">
              <img style={{ height: '100px', width: '100px' }} src={pic} />
            </div>
            <Row>
              <Col cW="80%">
                <h4 className="hh">{b.name}</h4>
              </Col>
              <Col cW="20%">
                <span className="absoluteMiddleRight primary popMenuTrigger" style={{display: admin ? "none" : ''}}>
                  <i className="material-icons ">more_vert</i>
                  <div className="popMenu">
                    <span onClick={() => handleStaffPopupClick('update', b)}>
                      Edit
                    </span>
                    {b.status === 2 ? (
                      <span
                        onClick={() =>
                          blockStaffAPI('unblock', b._id).then(() =>
                            refreshStaffList(),
                          )
                        }
                      >
                        Unblock
                      </span>
                    ) : (
                        <span
                          onClick={() =>
                            blockStaffAPI('block', b._id).then(() =>
                              refreshStaffList(),
                            )
                          }
                        >
                          Block
                        </span>
                      )}
                  </div>
                </span>
              </Col>
            </Row>
          </Card>
          </Grid>
          
        );
      }
      return <div key={b._id}></div>;
    });
  };

  if (isLoading) {
    return <Loader fullPage />;
  }

  const searchlistfunction = (value) => {
    console.log(value)
    console.log(staff)

    const newfilterdata = staffCopy.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );

    // this.setState({ users: newfilterdata })
    setStaff(newfilterdata)


  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Staff</title>
      </Helmet>
      <MerchantHeader active="staff" />
      <Container verticalMargin>
        <MerchantSideBar showClaimButton />
        <Main>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
            style={{display: admin ? "none" : ''}}
          >
            <div className="iconedInput fl">
              <i className="material-icons">
                <SearchIcon />
              </i>
              <input type="text" placeholder="Search Staff" onChange={(e) => {
                searchlistfunction(e.target.value)
              }} />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handleStaffPopupClick('new', {})}
            >
              <i className="material-icons">add</i>
              <span>Add User</span>
            </Button>
            </ActionBar>
          {/* <Row className="clr"> */}
          <Grid
          container
          direction="row"
          justify="center"
          alignContent="center"
          alignItems="center"
          >
            {staff && staff.length > 0 ? mappedCards() : null}
            </Grid> 
        </Main>
      </Container>
      {showStaffPopup ? (
        <CreateStaffPopup
          type={popupType}
          staff={editingStaff}
          refreshStaffList={() => refreshStaffList()}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
};

export default MerchantStaffListPage;
