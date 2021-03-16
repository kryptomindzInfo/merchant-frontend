import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import PaymentReceivedCard from '../../shared/PaymentReceivedCard';
import TotalInvoiceCard from '../../shared/TotalInvoiceCard';
import PaidInvoiceCard from '../../shared/PaidInvoiceCard';
import PendingInvoiceCard from '../../shared/PendingInvoiceCard';
import CreateZonePopup from './CreateZonePopup';
import { fetchTypeList, getZoneDetails, checkZoneStats } from '../api/MerchantAPI';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Main from '../../shared/Main';
import ActionBar from '../../shared/ActionBar';
import Table from '../../shared/Table';
import Button from '../../shared/Button';
import MerchantSideBar from '../../shared/sidebars/MerchantSideBar';
import ZoneCard from './ZoneCard';
import Loader from '../../shared/Loader';
import axios from 'axios';
import { MERCHANT_API, CURRENCY } from '../../constants';
import Card from '../../shared/Card';
import notify from '../../utils/Notify';
import history from '../../utils/history';

const MerchantDashboardPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [openZonePopup, setZonePopup] = React.useState(false);
  const [zoneList, setZoneList] = React.useState([]);
  const [zonestats, setZoneStats] = React.useState([]);
  const [copyZoneList, setCopyZoneList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingZone, setEditingZone] = React.useState({});
  const [paidByMC, setPaidByMC] = React.useState({});
  const [paidByPC, setPaidByPC] = React.useState({});
  const [paidByBC, setPaidByBC] = React.useState({});
  const [paidByUS, setPaidByUS] = React.useState({});
  const [zoneName, setZoneName] = React.useState('');
  const [subzoneName, setSubzoneName] = React.useState('');

  const getZoneStats = async(list) => {
    const statlist = list.map(async (zone) => {
        const data = await checkZoneStats(zone._id);
        return (data);
    })
    const result= await Promise.all(statlist);
    return({res:result, loading:false});
  }

  const refreshZoneList = async () => {
    setLoading(true)
    const zonedetails = await getZoneDetails();
    setZoneName(zonedetails.zone_name);
    setSubzoneName(zonedetails.subzone_name);
    const zonelist = await fetchTypeList("zone");
    setZoneList(zonelist.list);
    const zonestats = await getZoneStats(zonelist.list);
    setZoneStats(zonestats.res);
    setLoading(zonestats.loading);
  };

  const handleZonePopupClick = (type, subzone) => {
    setEditingZone(subzone);
    setPopupType(type);
    setZonePopup(true);
  };

  const onPopupClose = () => {
    setZonePopup(false);
  };

  const getStats = () => {
    axios
    .post(`${MERCHANT_API}/getDashStats`,{})
      .then(res => {
        if (res.status == 200) {
          if (res.data.status===0) {
            throw res.data.error;
          } else {
            setPaidByMC(res.data.post6.filter((val)=>val._id==='MC')[0]);
            setPaidByBC(res.data.post6.filter((val)=>val._id==='BC')[0]);
            setPaidByPC(res.data.post6.filter((val)=>val._id==='PC')[0]);
            setPaidByUS(res.data.post6.filter((val)=>val._id==='US')[0]);
            setStats(res.data);
          }
        }
      })
      .then(res => {
        setTimeout(function() {
          getStats();
        }, 3000);
      })
      .catch(err => {
        setTimeout(function() {
          getStats();
        }, 3000);
      });
  };

  const getZones = () => {
    return zoneList.map((zone,index) => {
      return (
        <tr key={zone._id}>
          <td className="tac">{zone.name}</td>
          <td
            className="tac popMenuTrigger"
            onClick={() => {
              localStorage.setItem('selectedZone', zone._id);
              localStorage.setItem('currentZone', JSON.stringify(zone));
              history.push(`/merchant/${zone._id}/subzones`);
            }}
          >
            {zone.subzone_count}
          </td>
          <td className="tac">{zone.branch_count}</td>
          <td className="tac">{zonestats[index].bill_generated}</td>
          <td className="tac">{zonestats[index].amount_generated}</td>
          <td className="tac">{zonestats[index].bill_paid}</td>
          <td className="tac">{zonestats[index].amount_paid}</td>
          <td className="tac">{zonestats[index].bill_pending}</td>
          <td className="tac">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <td className="tac">{zonestats[index].amount_pending}</td>
              <span className="absoluteMiddleRight primary popMenuTrigger">
                <i className="material-icons ">more_vert</i>
                <div className="popMenu">
                  <span
                    onClick={() => {
                      localStorage.setItem('selectedZone', zone._id);
                      localStorage.setItem('currentZone', JSON.stringify(zone));
                      history.push(`/merchant/${zone._id}/subzones`);
                    }}
                  >
                    <span>{subzoneName}</span>
                  </span>
                  <span onClick={() => handleZonePopupClick('update', zone)}>
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

  useEffect(() => {
    refreshZoneList();
    getStats();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }
  return (
    <Fragment>
      <Helmet>
        <title>Merchant | Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <MerchantHeader active="dashboard" />
      <Container verticalMargin>
        <MerchantSideBar />
        <Main>
          <Row>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Invoice Paid by Bank</h4>
              <div className="cardValue">
                {paidByBC ? paidByBC.bills_paid : 0}
            </div>
            </Card>
          </Col>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Invoice Paid by Partner</h4>
              <div className="cardValue">
              {paidByPC ? paidByPC.bills_paid : 0}
            </div>
            </Card>
          </Col>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Invoice Paid by Merchant</h4>
              <div className="cardValue">
                {paidByMC ? paidByMC.bills_paid : 0}
            </div>
            </Card>
          </Col>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Invoice Paid by User</h4>
              <div className="cardValue">
                {paidByUS ? paidByUS.bills_paid : 0}
            </div>
            </Card>
          </Col>
          </Row>
          <Row>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Amount Collected by Bank</h4>
              <div className="cardValue">
                {paidByBC ? paidByBC.amount_paid : 0}
            </div>
            </Card>
          </Col>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Amount Collected by Partner</h4>
              <div className="cardValue">
              {paidByPC ? paidByPC.amount_paid : 0}
            </div>
            </Card>
          </Col>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Amount Collected by Merchant</h4>
              <div className="cardValue">
                {paidByMC ? paidByMC.amount_paid : 0}
            </div>
            </Card>
          </Col>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Amount Collected by User</h4>
              <div className="cardValue">
                {paidByUS ? paidByUS.amount_paid : 0}
            </div>
            </Card>
          </Col>
          </Row>
          <Row>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Invoice Created</h4>
              <div className="cardValue">
                {stats.bills_generated}
            </div>
            </Card>
          </Col>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Amount Generated</h4>
              <div className="cardValue">
              {stats.amount_generated}
            </div>
            </Card>
          </Col>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Invoice Pending</h4>
              <div className="cardValue">
              {stats.bills_pending}
            </div>
            </Card>
          </Col>
          <Col>
            <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
              <h4>Amount Pending</h4>
              <div className="cardValue">
                {stats.amount_pending}
            </div>
            </Card>
          </Col>
          </Row>
        
        </Main>
        <div style={{ marginBottom: '50px' }}>
      <ActionBar
        marginBottom="33px"
        inputWidth="calc(100% - 241px)"
        className="clr"
      >
        <div className="iconedInput fl">
          <i className="material-icons">
            <SearchIcon />
          </i>
          <input type="text" placeholder="Search Zones" onChange={(e) => {
            searchlistfunction(e.target.value)
          }} />
        </div>

        <Button
          className="addBankButton"
          flex
          onClick={() => handleZonePopupClick('new', {})}
        >
          <AddIcon className="material-icons" />
          <span>Add {zoneName}</span>
        </Button>
      </ActionBar>
      <Card bigPadding>
        <div className="cardBody">
          <Table marginTop="34px">
            <thead>
              <tr>
                <th>Zones</th>
                <th>Subzones</th>
                <th>Branches</th>
                <th>Bills</th>
                <th>Amount Billed</th>
                <th>Paid bills</th>
                <th>Amount of paid bills</th>
                <th>Pending bills</th>
                <th>Amount of pending bills</th>
              </tr>
            </thead>
            <tbody>{zoneList && zoneList.length > 0 ? getZones() : null}</tbody>
          </Table>
        </div>
      </Card>
      {openZonePopup ? (
        <CreateZonePopup
          type={popupType}
          zone={editingZone}
          zonename={zoneName}
          refreshZoneList={(data) => refreshZoneList(data)}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </div>
      </Container>
    </Fragment>
  );
};

export default MerchantDashboardPage;
