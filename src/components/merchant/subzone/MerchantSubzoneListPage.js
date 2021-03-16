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
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import DashCard from '../dashboard/DashCards';
import axios from 'axios';
import { MERCHANT_API, CURRENCY } from '../../constants';
import CreateSubzonePopup from './CreateSubzonePopup';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import MerchantSideBar from '../../shared/sidebars/MerchantSideBar';
import { fetchSubzoneListByZone, getZoneDetails, checkSubZoneStats } from '../api/MerchantAPI';
import history from '../../utils/history';
import Footer from '../../Footer';

function MerchantSubzoneListPage(props) {
  const bankName = JSON.parse(localStorage.getItem('merchantLogged')).bank.name;
  const bankLogo = JSON.parse(localStorage.getItem('merchantLogged')).bank.logo;
  const zonename = JSON.parse(localStorage.getItem('currentZone')).name
  const [addSubzonePopup, setAddSubzonePopup] = React.useState(false);
  const [subzoneList, setSubzoneList] = React.useState([]);
  const [copySubzoneList, setCopySubzoneList] = React.useState([])
  const [popupType, setPopupType] = React.useState('new');
  const [zoneName, setZoneName] = React.useState('');
  const [subzoneName, setSubzoneName] = React.useState('');
  const [subzonestats, setSubZoneStats] = React.useState([]);
  const [editingSubzone, setEditingSubzone] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState({});
  const [paidByMC, setPaidByMC] = React.useState({});
  const [paidByPC, setPaidByPC] = React.useState({});
  const [paidByBC, setPaidByBC] = React.useState({});
  const [paidByUS, setPaidByUS] = React.useState({});
  const [invoicePaid, setInvoicePaid] = React.useState();
  const [amountPaid, setAmountPaid] = React.useState();
  const [created, setCreated] = React.useState({});
  const [uploaded, setUploaded] = React.useState({});
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

  const getStats = () => {
    axios
    .post(`${MERCHANT_API}/getMerchantSubzoneListDashStats`,{ zone_id:id})
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

  useEffect(() => {
    getStats();
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
          <td className="tac">0</td>
          <td className="tac">0</td>
          <td className="tac">{subzonestats[index].bill_paid}</td>
          <td className="tac">{subzonestats[index].amount_paid}</td>
          <td className="tac">{subzonestats[index].bill_generated}</td>
          <td className="tac bold">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
               <td className="tac">{subzonestats[index].amount_generated}</td>
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
      <Card style={{marginBottom:'10px' }}>
      <h3 style={{color:"green", textAlign:'center',marginBottom:'10px' }}>{zonename} </h3> 
      </Card>
        <MerchantSideBar showClaimButton />
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
            <DashCard title='Paid by bank' no={paidByBC ? paidByBC.bills_paid : 0} amount={paidByBC ? paidByBC.bills_paid : 0}/>
          </Col>
          <Col>
            <DashCard title='Paid by partner' no={paidByPC ? paidByPC.bills_paid : 0} amount={paidByPC ? paidByPC.bills_paid : 0}/>
          </Col>
          <Col>
            <DashCard title='Paid by merchant' no={paidByMC ? paidByMC.bills_paid : 0} amount={paidByMC ? paidByMC.bills_paid : 0}/>
          </Col>
          <Col>
            <DashCard title='Paid by user' no={paidByUS ? paidByUS.bills_paid : 0} amount={paidByUS ? paidByUS.bills_paid : 0}/>
          </Col>
        </Row>
          
         
        </Main>
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
          onClick={() => handleSubzonePopupClick('new', {})}
            >
              <AddIcon className="material-icons" />
              <span>Add {subzoneName}</span>
        </Button>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Subzones</th>
                    <th>Branches</th>
                    <th>Invoice Created</th>
                    <th>Amount Generated</th>
                    <th>Invoice Uploade</th>
                    <th>Amount Uploaded</th>
                    <th>Invoice Paid</th>
                    <th>Amount Paid</th>
                    <th>Invoice Pending</th>
                    <th>Amount Pending</th>
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
      <Footer bankname={bankName} banklogo={bankLogo}/>
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
