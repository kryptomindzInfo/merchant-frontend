import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CSVLink, CSVDownload } from "react-csv";
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Table from '../../Table';
import Card from '../../shared/Card';
import Col from '../../shared/Col';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import SelectInput from '../../shared/SelectInput';
import InvoiceCards from '../../cashier/invoice/InvoiceCards';
import AmountCards from '../../cashier/invoice/AmountCards';
import FormGroup from '../../shared/FormGroup';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CURRENCY } from '../../constants';
import DateFnsUtils from '@date-io/date-fns';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import Footer from '../../Footer';
import { fetchTypeList, getBillPeriods, checkStatsbydate, checkStatsbyperiod } from '../api/MerchantAPI'
import Loader from '../../shared/Loader';

const today = new Date();
const ReportPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const bankName =  JSON.parse(localStorage.getItem('merchantLogged')).bank.name
  const bankLogo = JSON.parse(localStorage.getItem('merchantLogged')).bank.logo
  const merchantName = JSON.parse(localStorage.getItem('merchantLogged')).details.name
  const [periodList, setPeriodList] = useState([]);
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [typeList, setTypeList] = useState([]);
  const [typeStats, setTypeStats] = useState([]);
  const [amountGenerated, setAmountGenerated] = useState();
  const [amountPaid, setAmountPaid] = useState();
  const [billGenerated, setBillGenerated] = useState();
  const [billPaid, setBillPaid] = useState();
  const [billPending, setBillPending] = useState();
  const [amountPending, setAmountPending] = useState();
  const [filter, setFilter] = useState('daterange');
  const [type, setType] = useState('zone');
  const [csvData, setcsvData] = useState([
    ["BillNo","Name","Amount","Mobile","DueDate"]
  ]);

  const fetchCSVData = async(list) => {
    const csvlist = list.map(async (invoice) => {
        return ([invoice.number,invoice.name,invoice.amount,invoice.mobile,invoice.due_date]);
    });
    const result= await Promise.all(csvlist);
    return({res:result, loading:false});
  };

  const refreshMerchantSettings = async () => {
    setLoading(true);
    getBillPeriods().then((data) => {
      setPeriodList(data.list);
    });
  };

  const getDatesBetweenDates = (startDate, endDate) => {
    let dates = []
    //to avoid modifying the original date
    const theDate = new Date(startDate)
    while (theDate < endDate) {
      dates = [...dates, new Date(theDate)]
      theDate.setDate(theDate.getDate() + 1)
    }
    return dates
  };

  const getStatsBydate = async(list,date) => {
    const statlist = list.map(async (item) => {
        const data = await checkStatsbydate(item._id,date,type);
        return (data);
    })
    const result= await Promise.all(statlist);
    return({res:result, loading:false});
  };

  const getStatsByPeriod = async(list,period) => {
    const statlist = list.map(async (item) => {
        const data = await checkStatsbyperiod(item._id,period.period_name,type);
        return (data);
    })
    const result= await Promise.all(statlist);
    return({res:result, loading:false});
  };

  const getTypeStatsBydate = async(datelist,typelist) => {
    const statlistbydate = datelist.map(async (date) => {
        const tomorrow = new Date(date)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const data = await getStatsBydate(typelist,tomorrow);
        // console.log(data.res);
        return ({
            date:date,
            data:data.res,
            amount_generated: data.res.reduce((a, b) => a + b.amount_generated, 0),
            bill_generated: data.res.reduce((a, b) => a + b.bill_generated, 0),
            amount_paid: data.res.reduce((a, b) => a + b.amount_paid, 0),
            bill_paid: data.res.reduce((a, b) => a + b.bill_paid, 0),
        });
    })
    const result= await Promise.all(statlistbydate);
    return({res:result, loading:false});
  };

  const getTypeStatsByperiod = async(periodlist,typelist) => {
    const statlistbyperiod = periodlist.map(async (period) => {
        const data = await getStatsByPeriod(typelist,period);
        // console.log(data.res);
        return ({
            period:period.period_name,
            data:data.res,
            amount_generated: data.res.reduce((a, b) => a + b.amount_generated, 0),
            bill_generated: data.res.reduce((a, b) => a + b.bill_generated, 0),
            amount_paid: data.res.reduce((a, b) => a + b.amount_paid, 0),
            bill_paid: data.res.reduce((a, b) => a + b.bill_paid, 0),
        });
    })
    const result= await Promise.all(statlistbyperiod);
    return({res:result, loading:false});
  };

  const getCardValues = (list) => {
      return ({
        amount_generated: list.reduce((a, b) => a + b.amount_generated, 0),
        bill_generated: list.reduce((a, b) => a + b.bill_generated, 0),
        amount_paid: list.reduce((a, b) => a + b.amount_paid, 0),
        bill_paid: list.reduce((a, b) => a + b.bill_paid, 0),
      });
  }

  const getReportByPeriod = async() => {
    setLoading(true);
    const periodlist = await periodList.slice(periodStart,periodEnd+1);
    console.log(periodlist);
    const typelist = await fetchTypeList(type);
    setTypeList(typelist.list);
    const typestats = await getTypeStatsByperiod(periodlist,typelist.list);
    const cardValues = await getCardValues(typestats.res);
    setAmountGenerated(cardValues.amount_generated);
    setAmountPaid(cardValues.amount_paid);
    setBillGenerated(cardValues.bill_generated);
    setBillPaid(cardValues.bill_paid);
    setBillPending(cardValues.bill_generated-cardValues.bill_paid);
    setAmountPending(cardValues.amount_generated-cardValues.amount_paid);
    setTypeStats(typestats.res);
    setLoading(typestats.loading);
  };


  const getReportByDateRange = async() => { 
  setLoading(true);
  const start = startOfDay(new Date(startDate));
  const end = endOfDay(new Date(endDate));
  const dateslist = await getDatesBetweenDates(start, end);
  const typelist = await fetchTypeList(type);
  setTypeList(typelist.list);
  const typestats = await getTypeStatsBydate(dateslist,typelist.list);
  const cardValues = await getCardValues(typestats.res);
  setAmountGenerated(cardValues.amount_generated);
  setAmountPaid(cardValues.amount_paid);
  setBillGenerated(cardValues.bill_generated);
  setBillPaid(cardValues.bill_paid);
  setTypeStats(typestats.res);
  setLoading(typestats.loading);
};

const getData = (i) => {
    return typeStats[i].data.map((date,index) => {
      if(filter === 'period'){
        return (
          <tr>
            <td>{typeList[index].name}</td>
            <td>{date.bill_generated}</td>
            <td>{date.amount_generated}</td>
            <td>{date.bill_paid}</td>
            <td>{date.amount_paid}</td>
            <td>{date.bill_generated-date.bill_paid}</td>
            <td>{date.amount_generated-date.amount_paid}</td>
          </tr>
        );
      }else{
        return (
          <tr>
            <td>{typeList[index].name}</td>
            <td>{date.bill_generated}</td>
            <td>{date.amount_generated}</td>
            <td>{date.bill_paid}</td>
            <td>{date.amount_paid}</td>
          </tr>
        );
      }
    });
};

const toggle = (type) => {
  setAmountGenerated(0);
  setAmountPaid(0);
  setBillGenerated(0);
  setBillPaid(0);
  setBillPending(0);
  setAmountPending(0);
  setTypeStats([]);
  setFilter(type);
};

const toggleType = (type) => {
  setAmountGenerated(0);
  setAmountPaid(0);
  setBillGenerated(0);
  setBillPaid(0);
  setBillPending(0);
  setAmountPending(0);
  setTypeStats([]);
  setType(type);
};


  useEffect(() => {
    refreshMerchantSettings();
    getReportByDateRange();
  }, []);


  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    
    <Fragment>
      <Helmet>
        <title>Merchant Dashboard | Cashier | E-WALLET </title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
        <MerchantHeader active="reports" />
      <Container verticalMargin>
      <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <Button
                  className={type === 'zone' ? 'active' : ''}
                  onClick={()=>{toggleType('zone')}}
                  style={{marginLeft:'5px'}}
                >
                  Zone
                </Button>
                <Button
                  className={type === 'subzone' ? 'active' : ''}
                  onClick={()=>{toggleType('subzone')}}
                  style={{marginLeft:'5px'}}
                >
                  Subzone
                </Button>
                <Button
                  className={type === 'branch' ? 'active' : ''}
                  onClick={()=>{toggleType('branch')}}
                  style={{marginLeft:'5px'}}
                >
                  Branch
                </Button>
              </div>
        
            <Row>
              <Col cW='40%'>
              <Card marginBottom="54px" buttonMarginTop="32px" smallValue style={{height:'220px'}}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <Button
                  className={filter === 'daterange' ? 'active' : ''}
                  onClick={()=>{toggle('daterange')}}
                  style={{marginLeft:'5px'}}
                >
                  Date Range
                </Button>
                <Button
                  className={filter === 'period' ? 'active' : ''}
                  onClick={()=>{toggle('period')}}
                  style={{marginLeft:'5px'}}
                >
                  Period
                </Button>
              </div>
        
                <Container>
                {filter === 'daterange' ? (
                  <div>
                  <h2 style={{color:"green"}}><b>Date Range</b></h2> 
                  <Row>
                    <Col cW='48%'>
                      <FormGroup>
                       <MuiPickersUtilsProvider
                         utils={DateFnsUtils}
                       >
                         <KeyboardDatePicker
                           id="date-picker-dialog"
                           size="small"
                           fullWidth
                           inputVariant="outlined"
                           format="dd/MM/yyyy"
                           required
                           maxDate={endDate}
                           InputLabelProps={{
                           shrink: true,
                           }}
                           value={
                              startDate
                             }
                           onChange={date =>
                            setStartDate(date)
                           }
                            KeyboardButtonProps={{
                           'aria-label': 'change date',
                                                       }}
                         />
                       </MuiPickersUtilsProvider>
                     </FormGroup>                  
                    </Col>
                    <Col cW='4%'>To</Col> 
                    <Col cW='48%'>
                      <FormGroup>
                       <MuiPickersUtilsProvider
                         utils={DateFnsUtils}
                       >
                         <KeyboardDatePicker
                           id="date-picker-dialog"
                           size="small"
                           fullWidth
                           minDate={startDate}
                           inputVariant="outlined"
                           format="dd/MM/yyyy"
                           required
                           InputLabelProps={{
                           shrink: true,
                           }}
                           value={
                              endDate
                             }
                           onChange={date =>
                            setEndDate(date)
                           }
                            KeyboardButtonProps={{
                           'aria-label': 'change date',
                                                       }}
                         />
                       </MuiPickersUtilsProvider>
                     </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{marginTop:"20px",margin:'auto'}}>
                      <Button
                        style={{padding:'9px',marginTop:"20px"}}
                        onClick={()=>getReportByDateRange()}
                      >
                        Get Report
                      </Button>
                  </Row>
                </div>
                ):""}
                 {filter === 'period' ? (
                  <div>
                  <h2 style={{color:"green"}}><b>Period</b></h2> 
                  <Row>
                   
                    <Col cW='48%'>
                    <FormGroup>
                      <SelectInput
                        style={{marginTop:"10px"}}
                        value={periodStart}
                        onChange={(event)=>{
                          setPeriodStart(event.target.value);
                        }}
                        name="from"
                        required
                      >
                        {periodList.map((b,index) => {
                          return (
                            <option key={b._id} name={b.period_name} value={index}>
                              {b.period_name}
                            </option>
                          );
                      })}
                      </SelectInput>
                    </FormGroup>
                    </Col>
                    <Col cW='4%'>To</Col> 
                    <Col cW='48%'>
                    <FormGroup>
                      <SelectInput
                        style={{marginTop:"10px"}}
                        value={periodEnd}
                        onChange={(event)=>{
                          setPeriodEnd(event.target.value);
                        }}
                        name="from"
                        required
                      >
                        {periodList.map((b,index) => {
                          return (
                            <option key={b._id} value={index}>
                              {b.period_name}
                            </option>
                          );
                      })}
                      </SelectInput>
                    </FormGroup>
                    </Col>
                    </Row>
                    <Row style={{marginTop:"20px",margin:'auto'}}>
                      <Button
                        style={{padding:'9px'}}
                        onClick={()=>getReportByPeriod()}
                      >
                        Get Report
                      </Button>
                  </Row>
                </div>
                ):""}
              </Container>
              </Card>
              </Col>
              <Col  cW='30%'>
              </Col>
              <Col  cW='30%'>
              </Col>
            </Row>
            {filter === 'period' ? (
            <div>
              <Row>
                <Col>
                  <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
                    <h4>Bills</h4>
                    <div className="cardValue">{billGenerated}</div>
                  </Card>
                </Col>
                <Col>
                  <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
                    <h4>Bills Paid</h4>
                    <div className="cardValue">{billPaid}</div>
                  </Card>
                </Col>
                <Col>
                  <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
                    <h4>Amount Billed</h4>
                    <div className="cardValue">{amountGenerated}</div>
                  </Card>
                </Col>
                <Col>
                  <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
                    <h4>Amount paid </h4>
                    <div className="cardValue">{amountPaid}</div>
                  </Card>
                </Col>
                  <Col>
                  <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
                    <h4>Bill Pending</h4>
                    <div className="cardValue">{amountPending}</div>
                  </Card>
                </Col>
                <Col>
                  <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
                    <h4>Amount pending </h4>
                    <div className="cardValue">{amountPending}</div>
                  </Card>
                </Col>
              </Row>
            </div>
            
            ): (
              <div>
              <Row>
                <Col>
                  <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
                    <h4>Bills</h4>
                    <div className="cardValue">{billGenerated}</div>
                  </Card>
                </Col>
                <Col>
                  <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
                    <h4>Bills Paid</h4>
                    <div className="cardValue">{billPaid}</div>
                  </Card>
                </Col>
                <Col>
                  <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
                    <h4>Amount Billed</h4>
                    <div className="cardValue">{amountGenerated}</div>
                  </Card>
                </Col>
                <Col>
                  <Card marginBottom="10px" buttonMarginTop="10px" style={{textAlign:'center'}} bordered smallValue>
                    <h4>Amount paid </h4>
                    <div className="cardValue">{amountPaid}</div>
                  </Card>
                </Col>
              </Row>
            </div>
            )}
          
            <Card bigPadding style={{width:'100%'}}>  
            {typeStats && typeStats.length > 0 ? (
              typeStats.map((filtertype,index)=>{
              return(
                <div>
                  {filter === 'daterange' ? (
                     <h3 style={{color:"green" ,textAlign:"left"}}><b>{`${new Date(filtertype.date).getDate()}/${new Date(filtertype.date).getMonth()+1}/${new Date(filtertype.date).getUTCFullYear()}`}</b></h3>
                  ):(
                    <h3 style={{color:"green" ,textAlign:"left"}}><b>{filtertype.period}</b></h3>
                  )} 
                 
                  <Table marginTop="34px">
                  {filter === 'daterange' ? (
                      <thead>
                      <tr>
                        <th>{type}</th>
                          <th>Bills</th>
                          <th>Amount Billed</th>
                          <th>Paid bills</th>
                          <th>Amount paid </th>
                        </tr>
                    </thead>
                    ):(
                      <thead>
                      <tr>
                        <th>{type}</th>
                          <th>Bills</th>
                          <th>Amount Billed</th>
                          <th>Paid bills</th>
                          <th>Amount paid </th>
                          <th>Pending bills</th>
                          <th>Pending Amount</th>
                        </tr>
                    </thead>
                      
                    )}
                    <tbody>
                      {getData(index)}
                      {filter === 'period'? (
                      <tr>
                        <td className="green">Total</td>
                        <td className="green">{typeStats[index].bill_generated}</td>
                        <td className="green">{typeStats[index].amount_generated}</td>
                        <td className="green">{typeStats[index].bill_paid}</td>
                        <td className="green">{typeStats[index].amount_paid}</td>
                        <td className="green">{typeStats[index].bill_generated-typeStats[index].bill_paid}</td>
                        <td className="green">{typeStats[index].amount_generated-typeStats[index].amount_paid}</td>
                      </tr>
                      ):(
                        <tr>
                        <td className="green">Total</td>
                        <td className="green">{typeStats[index].bill_generated}</td>
                        <td className="green">{typeStats[index].amount_generated}</td>
                        <td className="green">{typeStats[index].bill_paid}</td>
                        <td className="green">{typeStats[index].amount_paid}</td>
                      </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              );
            })
          ) : (
            <h3
              style={{
                textAlign: 'center',
                color: 'grey',
                height: '300px',
              }}
            >
              No invoice found
            </h3>
          )}
        </Card>
 
            
      <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{height:'80px'}}>
          <h4 style={{textAlign:'center'}}>Report generated at {`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`} </h4>
        </Card>
      </Container>
      <Footer bankname={bankName} banklogo={bankLogo}/>
    </Fragment>
  );
};

export default ReportPage;