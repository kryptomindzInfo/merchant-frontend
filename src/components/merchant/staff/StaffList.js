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
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import CreateStaffPopup from './CreateStaffPopup';
import { CONTRACT_URL, STATIC_URL } from '../../constants';
import SideBar from '../../shared/SideBar';

const StaffList = () => {
  const [staff, setStaff] = useState('');
  const [showStaffPopup, setStaffPopup] = useState(false);
  const [popupType, setPopupType] = React.useState('new');
  const [editingStaff, setEditingStaff] = React.useState({});

  const handleStaffPopupClick = (type, staffObj) => {
    setEditingStaff(staffObj);
    setPopupType(type);
    setStaffPopup(true);
  };

  const refreshStaffList = async () => {
    // const data = await fetchBranchList();
    // setBranchList(data.list);
    // setLoading(data.loading);
  };

  const onPopupClose = () => {
    setStaffPopup(false);
  };

  useEffect(() => {
    const getStaffList = () => {
      const list = [
        {
          name: 'Yusuf Jk',
          isAdmin: false,
          logo: '2323232.png',
        },
        {
          name: 'Demo',
          isAdmin: true,
          logo: '2323232.png',
        },
      ];
      setStaff(list);
    };
    getStaffList();
  }, []);

  return (
    <Wrapper from='bank'>
      <Helmet>
        <meta charSet='utf-8'/>
        <title>Merchant | Staff</title>
      </Helmet>
      <MerchantHeader active='staff'/>
      <Container verticalMargin>
        <SideBar/>
        <Main>
          <ActionBar
            marginBottom='33px'
            inputWidth='calc(100% - 241px)'
            className='clr'
          >
            <div className='iconedInput fl'>
              <i className='material-icons'>
                <SearchIcon/>
              </i>
              <input type='text' placeholder='Search Staff'/>
            </div>

            <Button className='addBankButton' flex onClick={() => handleStaffPopupClick('new', {})}>
              <i className='material-icons'>add</i>
              <span>Add Staff</span>
            </Button>
          </ActionBar>
          <Row className="clr">
            {staff && staff.length > 0
              ? staff.map((b) => {
                if (!b.isAdmin) {
                  const pic =
                    b.logo && b.logo !== '' && b.logo !== undefined
                      ? STATIC_URL + b.logo
                      : `${CONTRACT_URL}main/default-profile.png`;
                  return (
                    <Card
                      key={b._id}
                      col
                      horizontalMargin='10px'
                      cardWidth='192px'
                    >
                      <div className='profile'>
                        <img src={pic}/>
                      </div>
                      <Row>
                        <Col cW='80%'>
                          <h4 className='hh'>{b.name}</h4>
                        </Col>
                        <Col cW='20%'>
                          <Button flex noMin style={{padding: '5px'}}>
                            Edit
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  );
                }
                return (
                  <div key={b._id}></div>
                );
              })
              : null}
          </Row>
        </Main>
      </Container>
      {showStaffPopup ? <CreateStaffPopup
        type={popupType}
        staff={editingStaff}
        refreshBranchList={() => refreshStaffList()}
        onClose={() => onPopupClose()}
      /> : null}
    </Wrapper>
  );
};

export default StaffList;
