import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DashCard from './DashCards';
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
import Footer from '../../Footer';

const MerchantDashboardPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const bankName = JSON.parse(localStorage.getItem('merchantLogged')).bank.name;
  const bankLogo = JSON.parse(localStorage.getItem('merchantLogged')).bank.logo;
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
  const [invoicePaid, setInvoicePaid] = React.useState();
  const [amountPaid, setAmountPaid] = React.useState();
  const [created, setCreated] = React.useState({});
  const [uploaded, setUploaded] = React.useState({});
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
            setInvoicePaid(
              res.data.post6.reduce((a, b) => {
                return a + b.bills_paid;
              }, 0)
            );
            setAmountPaid(
              res.data.post6.reduce((a, b) => {
                return a + b.amount_paid;
              }, 0)
            );
            setCreated(res.data.post7.filter((val)=>val._id===1)[0]);
            setUploaded(res.data.post7.filter((val)=>val._id===0)[0]);
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
            <DashCard title='Invoice Created' no={created ? created.bills_generated : 0} amount={created ? created.amount_generated : 0}/>
          </Col>
          <Col>
            <DashCard title='Invoice Uploaded' no={uploaded ? uploaded.bills_generated : 0} amount={uploaded ? uploaded.amount_generated : 0}/>
          </Col>
          <Col>
            <DashCard title='Invoice Paid' no={invoicePaid} amount={amountPaid}/>
          </Col>
          <Col>
            <DashCard title='Invoice Pending' no={stats.bills_pending} amount={stats.amount_pending}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <DashCard title='Paid by bank' no={paidByBC ? paidByBC.bills_paid : 0} amount={paidByBC ? paidByBC.amount_paid : 0}/>
          </Col>
          <Col>
            <DashCard title='Paid by partner' no={paidByPC ? paidByPC.bills_paid : 0} amount={paidByPC ? paidByPC.amount_paid : 0}/>
          </Col>
          <Col>
            <DashCard title='Paid by merchant' no={paidByMC ? paidByMC.bills_paid : 0} amount={paidByMC ? paidByMC.amount_paid : 0}/>
          </Col>
          <Col>
            <DashCard title='Paid by user' no={paidByUS ? paidByUS.bills_paid : 0} amount={paidByUS ? paidByUS.amount_paid : 0}/>
          </Col>
        </Row>
          
        </Main>
        <div style={{ marginBottom: '50px' }}>
      <ActionBar
        marginBottom="33px"
        inputWidth="calc(100% - 241px)"
        className="clr"
      >
      </ActionBar>
      <Card bigPadding>
      <Button
          className="dashBtn"
          style={{float:"right", marginBottom:'10px'}}
          flex
          onClick={() => handleZonePopupClick('new', {})}
        >
          <AddIcon className="material-icons" />
          <span>Add {zoneName}</span>
        </Button>
        <div className="cardBody">
          <Table marginTop="34px">
            <thead>
              <tr>
                <th>Zones</th>
                <th>Subzones</th>
                <th>Branches</th>
                <th>Invoice Created</th>
                <th>Amount Generated</th>
                <th>Paid Invoices</th>
                <th>Amount Paid</th>
                <th>Pending Invoices</th>
                <th>Amount Pending</th>
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
      <Footer bankname={bankName} banklogo={bankLogo}/>
    </Fragment>
  );
};

export default MerchantDashboardPage;
