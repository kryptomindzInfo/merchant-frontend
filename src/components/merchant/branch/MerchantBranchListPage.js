import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Loader from '../../shared/Loader';
import axios from 'axios';
import Container from '../../shared/Container';
import ActionBar from '../../shared/ActionBar';
import Table from '../../shared/Table';
import DashCard from '../dashboard/DashCards';
import { MERCHANT_API, CURRENCY } from '../../constants';
import Main from '../../shared/Main';
import CreateBranchPopup from './CreateBranchPopup';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import MerchantSideBar from '../../shared/sidebars/MerchantSideBar';
import {
  blockMerchantBranch,
  fetchBranchList,
  fetchBranchListBySubzone,
  checkBranchStats,
  unblockMerchantBranch,
  getZoneDetails,
} from '../api/MerchantAPI';
import history from '../../utils/history';
import Footer from '../../Footer';

function MerchantBranchListPage(props) {
  const bankName = JSON.parse(localStorage.getItem('merchantLogged')).bank.name;
  const bankLogo = JSON.parse(localStorage.getItem('merchantLogged')).bank.logo;
  const merchantid = JSON.parse(localStorage.getItem('merchantLogged')).details._id;
  const admin = JSON.parse(localStorage.getItem('merchantLogged')).admin;;
  const [addBranchPopup, setAddBranchPopup] = React.useState(false);
  const [branchstats, setBranchStats] = React.useState([]);
  const subzonename = JSON.parse(localStorage.getItem('currentSubzone')).name;
  const [zoneName, setZoneName] = React.useState('');
  const [subzoneName, setSubzoneName] = React.useState('');
  const [branchList, setBranchList] = React.useState([]);
  const [copyBranchList, setCopyBranchList] = React.useState([]);
  const [stats, setStats] = React.useState({});
  const [paidByMC, setPaidByMC] = React.useState({});
  const [paidByPC, setPaidByPC] = React.useState({});
  const [paidByBC, setPaidByBC] = React.useState({});
  const [paidByUS, setPaidByUS] = React.useState({});
  const [invoicePaid, setInvoicePaid] = React.useState();
  const [amountPaid, setAmountPaid] = React.useState();
  const [created, setCreated] = React.useState({});
  const [uploaded, setUploaded] = React.useState({});
  const [popupType, setPopupType] = React.useState('new');
  const [editingBranch, setEditingBranch] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const { match } = props;
  const { id } = match.params;
  console.log(id)

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

  const getBranchReportURL = (cashierId) => {
    return `merchant/branch/report/${cashierId}`;
  };

  const getStats = () => {
    axios
    .post(`${MERCHANT_API}/getMerchantBranchListDashStats`,{ subzone_id:id})
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

  const getBranchStats = async(list) => {
    const statlist = list.map(async (branch) => {
        const data = await checkBranchStats(branch._id);
        return (data);
    })
    const result= await Promise.all(statlist);
    return({res:result, loading:false});
  }

  const refreshBranchList = async () => {
    setLoading(true)
    const subzonedetails = await getZoneDetails(merchantid);
    setZoneName(subzonedetails.zone_name);
    setSubzoneName(subzonedetails.subzone_name);
    const branchlist = await fetchBranchListBySubzone(id);
    setBranchList(branchlist.list);
    const branchstats = await getBranchStats(branchlist.list);
    setBranchStats(branchstats.res);
    setLoading(branchstats.loading);
  };

  useEffect(() => {
    getStats();
    refreshBranchList();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }

  const getBranchList = () => {
    return branchList.map((branch,index) => {
      return (
        <tr key={branch._id}>
          <td className="tac">{branch.name}</td>
          <td className="tac">{branchstats[index].bill_generated}</td>
          <td className="tac">{branchstats[index].amount_generated}</td>
          <td className="tac">0</td>
          <td className="tac">0</td>
          <td className="tac">{branchstats[index].bill_paid}</td>
          <td className="tac">{branchstats[index].amount_paid}</td>
          <td className="tac">{branchstats[index].bill_generated-branchstats[index].bill_paid}</td>
          <td className="tac">{branchstats[index].amount_generated-branchstats[index].amount_paid}</td>
          <td className="tac bold green">
            <Button
              style={{minWidth:'90%', marginRight:'5px'}}
              onClick={() => {
                localStorage.setItem(
                  'selectedBranch',
                  JSON.stringify(branch),
                );
              history.push(`/merchant/branch/dashboard/${branch._id}`);
              }}
            >                    
              View                   
            </Button>
              <span className="absoluteMiddleRight primary popMenuTrigger" style={{display: admin ? "none" : ''}}>
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

  const backlistfunciton = () => {
    const get_id = localStorage.getItem("selectedZone")
    history.push(`/merchant/${get_id}/subzones`)
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
      <Card style={{marginBottom:'10px' }}>
      <h3 style={{color:"green", textAlign:'center',marginBottom:'10px' }}>{subzonename} </h3> 
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
            <DashCard title='Invoice Pending' no={created ? created.bills_generated-invoicePaid : 0} amount={created ? created.amount_generated-amountPaid : 0}/>
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
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            {/* <div className="iconedInput fl">
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
            <Button
              className="addBankButton"
              flex
              // onClick={() => handleBranchPopupClick('new', {})}
              onClick={() => {
                backlistfunciton()
              }}
            >
              
              <span>Back</span>
            </Button> */}
          </ActionBar>
          <Card bigPadding>
          <Button
              className="addBankButton"
              flex
              style={{
                float:"right",
                marginBottom:'10px',
                display: admin ? "none" : '',
              }}
              onClick={() => handleBranchPopupClick('new', {})}
            >
              <AddIcon className="material-icons" />
              <span>Add Branch</span>
            </Button>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Branches</th>
                    <th>Invoice Created</th>
                    <th>Amount Generated</th>
                    <th>Invoice Uploaded</th>
                    <th>Amount Uploaded</th>
                    <th>Invoice Paid</th>
                    <th>Amount Paid</th>
                    <th>Invoice Pending</th>
                    <th>Amount Pending</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {branchList && branchList.length > 0 ? getBranchList() : null}
                </tbody>
              </Table>
            </div>
          </Card>
        
      </Container>
      <Footer bankname={bankName} banklogo={bankLogo}/>
      {addBranchPopup ? (
        <CreateBranchPopup
          subzonename={subzoneName}
          type={popupType}
          subzoneId={id}
          zoneID={localStorage.getItem('selectedZone')}
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
