import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CSVLink, CSVDownload } from "react-csv";
import BranchHeader from '../../shared/headers/branch/BranchHeader';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Table from '../../shared/Table';
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
import A from '../../shared/A';
import {
  getMerchantSettings,
  fetchBranchInvoicesBydate,
  fetchBranchInvoicesByPeriod,
  fetchBranchInvoicesByDateRange, 
} from '../../shared/api/Api';
import Loader from '../../shared/Loader';
import history from '../../utils/history';

const today = new Date();
const BranchReport = (props) => {
  const apiId = props.apitype === 'merchantBranch' ? " " : props.match.params.id
  const [isLoading, setLoading] = useState(false);
  const bankName =  props.apitype === 'merchantBranch' ?
    JSON.parse(localStorage.getItem('branchLogged')).bank.name :
    JSON.parse(localStorage.getItem('merchantLogged')).bank.name
  const bankLogo = props.apitype === 'merchantBranch' ?
    JSON.parse(localStorage.getItem('branchLogged')).bank.logo:
    JSON.parse(localStorage.getItem('merchantLogged')).bank.logo
  const branchName = props.apitype === 'merchantBranch' ?
    JSON.parse(localStorage.getItem('branchLogged')).details.name :
    JSON.parse(localStorage.getItem('selectedBranch')).name
  const merchantName = props.apitype === 'merchantBranch' ?
    JSON.parse(localStorage.getItem('branchLogged')).merchant.name :
    JSON.parse(localStorage.getItem('merchantLogged')).details.name
  const [invoiceList, setInvoiceList] = useState([]);
  const [periodList, setPeriodList] = useState([]);
  const [periodTableList, setPeriodTableList] = useState([]);
  const [dateTableList, setDateTableList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [periodStartDate, setPeriodStartDate] = useState("");
  const [periodEndDate, setPeriodEndDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [filter, setFilter] = useState('billdate');
  const [periodStart, setPeriodStart] = useState('');
  const [billRaised, setBillRaised] = useState(0);
  const [billPending, setBillPending] = useState(0);
  const [counterBill, setCounterBill] = useState(0);
  const [billPaid, setBillPaid] = useState(0);
  const [amountRaised, setAmountRaised] = useState(0);
  const [amountPending, setAmountPending] = useState(0);
  const [counterAmount, setCounterAmount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [periodEnd, setPeriodEnd] = useState('');
  
  const [formdate, setFormdate] = useState(new Date());
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
    getMerchantSettings(props.apitype).then((data) => {
      setPeriodList(data.bill_period_list);
      setStartDate(data.bill_period_list[0].start_date);
      setEndDate(new Date());
    });
  };

  const preProcessPeriodTableData = async(list) => {
    const reducedperiodList = periodList.slice(periodStart, periodEnd+1);
      const data = reducedperiodList.map(async (period) => {
        const raised = await list.filter((invoice) => {
          return (invoice.bill_period.period_name === period.period_name);
        });
        const pending = await list.filter((invoice) => {
          return (
            invoice.bill_period.period_name === period.period_name &&
            invoice.paid === 0 &&
            invoice.is_validated === 1 &&
            invoice.is_counter === false
        );
        });
        const paid = await list.filter((invoice) => {
          return (
            invoice.bill_period.period_name === period.period_name &&
            invoice.paid === 1 
          );
        });
        const counter = await list.filter((invoice) => {
          return (
            invoice.bill_period.period_name === period.period_name &&
            invoice.is_counter === true
          );
        });
        return ({
          period_name: period.period_name,
          raised: raised,
          pending: pending,
          paid: paid,
          counter: counter,
        });
      });
    const result= await Promise.all(data);
    return({res:result});
  };

  const preProcessDateTableData = async(datelist, list) => {
      const data = datelist.map(async (date) => {
        const formateddate = `${date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate()
          }/${date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
          }/${date.getFullYear()}`;
        const raised = await list.filter((invoice) => {
          return (invoice.bill_date === formateddate);
        });
        const pending = await list.filter((invoice) => {
          return (
            invoice.bill_date === formateddate &&
            invoice.paid === 0 &&
            invoice.is_validated === 1 &&
            invoice.is_counter === false
        );
        });
        const paid = await list.filter((invoice) => {
          return (
            invoice.bill_date === formateddate &&
            invoice.paid === 1 
          );
        });
        const counter = await list.filter((invoice) => {
          return (
            invoice.bill_date === formateddate &&
            invoice.is_counter === true
          );
        });
        return ({
          date: formateddate,
          raised: raised,
          pending: pending,
          paid: paid,
          counter: counter,
        });
      });
    const result= await Promise.all(data);
    return({res:result});
  };

  const setPeriodTable = async(list) => {
    const data = list.map(async (period) => {
      return({
        name: period.period_name,
        raised: period.raised.length,
        paid: period.paid.length,
        pending: period.pending.length,
        counter: period.counter.length,
        amountRaised: period.raised.reduce((a, b) => {
          return a + b.amount;
        }, 0),
        amountPaid:period.paid.reduce((a, b) => {
          return a + b.amount;
        }, 0),
        amountPending: period.pending.reduce((a, b) => {
        return a + b.amount;
        }, 0),
        counterAmount: period.counter.reduce((a, b) => {
          return a + b.amount;
        }, 0),
    });
    });
  const result= await Promise.all(data);
  return({res:result, loading:false});

  };

  const setDateTable = async(list) => {
    const data = list.map(async (date) => {
      return({
        name: date.date,
        raised: date.raised.length,
        paid: date.paid.length,
        pending: date.pending.length,
        counter: date.counter.length,
        amountRaised: date.raised.reduce((a, b) => {
          return a + b.amount;
        }, 0),
        amountPaid:date.paid.reduce((a, b) => {
          return a + b.amount;
        }, 0),
        amountPending: date.pending.reduce((a, b) => {
        return a + b.amount;
        }, 0),
        counterAmount: date.counter.reduce((a, b) => {
          return a + b.amount;
        }, 0),
    });
    });
  const result= await Promise.all(data);
  return({res:result, loading:false});

  };

  const setData = async(list) => {
    const paidRows = await list.filter((invoice) => {
      return invoice.paid === 1;
    });
    const unpaidRows = await list.filter((invoice) => {
      return (
        invoice.paid === 0 &&
        invoice.is_validated === 1 &&
        invoice.is_counter === false
      );
    });
    const counterRows = await list.filter((invoice) => {
      return (
        invoice.is_counter === true
      );
    });

    return({
      raised: list.length,
      paid: paidRows.length,
      pending: unpaidRows.length,
      counter: counterRows.length,
      amountRaised: list.reduce((a, b) => {
        return a + b.amount;
        }, 0),
      amountPaid: paidRows.reduce((a, b) => {
        return a + b.amount;
        }, 0),
      amountPending: unpaidRows.reduce((a, b) => {
        return a + b.amount;
        }, 0),
      counterAmount: counterRows.reduce((a, b) => {
        return a + b.amount;
        }, 0),
      loading: false,
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
  }

  const getReportByPeriod = async() => {
    setLoading(true);
    const start = startOfDay(new Date(periodStartDate));
    const end = endOfDay(new Date(periodEndDate));
    const res = await fetchBranchInvoicesByPeriod(start,end, props.apitype,apiId );
    const predata = await preProcessPeriodTableData(res.list);
    const tabledata = await setPeriodTable(predata.res);
    const data = await setData(res.list);
    setBillRaised(data.raised);
    setBillPending(data.pending);
    setBillPaid(data.paid);
    setCounterBill(data.counter);
    setAmountRaised(data.amountRaised);
    setAmountPaid(data.amountPaid);
    setAmountPending(data.amountPending);
    setCounterAmount(data.counterAmount);
    setPeriodTableList(tabledata.res);
    setLoading(data.loading);
  };

  const getReportByDateRange = async() => { 
  setLoading(true);
  const start = startOfDay(new Date(startDate));
  const end = endOfDay(new Date(endDate));
  const res = await fetchBranchInvoicesByDateRange(start,end,props.apitype,apiId);
  const datelist = await getDatesBetweenDates(start, end);
  const predata = await preProcessDateTableData(datelist,res.list);
  const tabledata = await setDateTable(predata.res);
  const data = await setData(res.list);
  setDateTableList(tabledata.res);
  setBillRaised(data.raised);
  setBillPending(data.pending);
  setBillPaid(data.paid);
  setCounterBill(data.counter);
  setAmountRaised(data.amountRaised);
  setAmountPaid(data.amountPaid);
  setAmountPending(data.amountPending);
  setCounterAmount(data.counterAmount);
  setLoading(data.loading);
};

  const getReportByDate = async() => { 
      setLoading(true);
      const date = `${formdate.getDate() + 1 < 10 ? `0${formdate.getDate()}` : formdate.getDate()
      }/${formdate.getMonth() + 1 < 10
        ? `0${formdate.getMonth() + 1}`
        : formdate.getMonth() + 1
      }/${formdate.getFullYear()}`;
      const res = await fetchBranchInvoicesBydate(date,props.apitype,apiId);
      const csvDATA = await fetchCSVData(res.list);
      setAmount(
      res.list.reduce((a, b) => {
      return a + b.amount;
      }, 0));
      setcsvData([["BillNo","Name","Amount","Mobile","DueDate"],...csvDATA.res])
      setInvoiceList(res.list);
      const data = await setData(res.list);
      setBillRaised(data.raised);
      setBillPending(data.pending);
      setBillPaid(data.paid);
      setCounterBill(data.counter);
      setAmountRaised(data.amountRaised);
      setAmountPaid(data.amountPaid);
      setAmountPending(data.amountPending);
      setCounterAmount(data.counterAmount);
      setLoading(csvDATA.loading);
  };

  const toggle = (type) => {
    if(type==='daterange'){
      setEndDate(new Date());
    }
    setBillRaised(0);
    setBillPending(0);
    setBillPaid(0);
    setCounterBill(0);
    setAmountRaised(0);
    setAmountPaid(0);
    setAmountPending(0);
    setCounterAmount(0);
    setFilter(type);
  };

  const getInvoices = () => {
    return invoiceList.map((invoice) => {
      return (
        <tr key={invoice._id}>
          <td>{invoice.number}</td>
          <td>{invoice.name}</td>
          <td>
            {CURRENCY} {invoice.amount}
          </td>
          <td>{invoice.mobile}</td>
          <td>{invoice.due_date}</td>
        </tr>
      );
    });
  };

  const getPeriods = () => {
    return periodTableList.map((period) => {
      return (
        <tr key={period.name}>
          <td>{period.name}</td>
          <td>{period.raised}</td>
          <td>{period.amountRaised}</td>
          <td>0</td>
          <td>0</td>
          <td>{period.paid}</td>
          <td>{period.amountPaid}</td>
          <td>{period.pending}</td>
          <td>{period.amountPending}</td>
          <td>{period.counter}</td>
          <td>{period.counterAmount}</td>
          
        </tr>
      );
    });
  };

  const getDates = () => {
    return dateTableList.map((date) => {
      return (
        <tr key={date.name}>
          <td>{date.name}</td>
          <td>{date.raised}</td>
          <td>{date.amountRaised}</td>
          <td>0</td>
          <td>0</td>
          <td>{date.paid}</td>
          <td>{date.amountPaid}</td>
          <td>{date.pending}</td>
          <td>{date.amountPending}</td>
          <td>{date.counter}</td>
          <td>{date.counterAmount}</td>
        </tr>
      );
    });
  };


  useEffect(() => {
    console.log('eg')
    refreshMerchantSettings();
    getReportByDate();
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
      {props.apitype === 'merchantBranch' ? (
      <BranchHeader active="reports" />
      ) : (
        <MerchantHeader active="reports" />
      )}
      <Container verticalMargin>
      {props.apitype === 'merchant' ? (
        
        <Card >
        <div style={{display:'flex'}}>
          <button style={{border:"none",width:"100px"}} >
              <A>
                <u>Reports</u>
              </A>
          </button>
          <button style={{border:"none",width:"100px"}} onClick={() => {
             history.push(`/merchant/branch/dashboard/${apiId}`);
            }}>
              <A>
                DashBoard
            </A>
          </button>
        <h2 style={{color:"green",marginLeft:"330px" }}><b>{branchName}</b> </h2> 
        
        </div>
      </Card>
      ):''}
            <div
                style={{
                  display: 'flex',
                  justifyContent: 'left',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <Button
                  className={filter === 'billdate' ? 'active' : ''}
                  onClick={()=>{toggle('billdate')}}
                  marginRight="5px"
                  padding="5px"
                >
                  Bill Date
                </Button>
                <Button
                  className={filter === 'period' ? 'active' : ''}
                  onClick={()=>{toggle('period')}}
                  style={{marginLeft:'5px'}}
                >
                  Period
                </Button>
                <Button
                  className={filter === 'daterange' ? 'active' : ''}
                  onClick={()=>{toggle('daterange')}}
                  style={{marginLeft:'5px'}}
                >
                  Date Range
                </Button>
              </div>
            <Row>
              <Col cW='40%'>
              <Card marginBottom="54px" buttonMarginTop="32px" smallValue style={{height:'180px'}}>
                <Container>
                
                {filter === 'billdate' ? (
                  <div>
                    <h2 style={{color:"green"}}><b>Date</b></h2> 
                    <Row>
                      <Col cW='100%'>
                       <FormGroup>
                       <MuiPickersUtilsProvider
                         utils={DateFnsUtils}
                       >
                         <KeyboardDatePicker
                           id="date-picker-dialog"
                           size="small"
                           fullWidth
                           maxDate={new Date()}
                           inputVariant="outlined"
                           format="dd/MM/yyyy"
                           required
                           InputLabelProps={{
                           shrink: true,
                           }}
                           value={
                             formdate
                             }
                           onChange={date =>
                           setFormdate(date)
                           }
                            KeyboardButtonProps={{
                           'aria-label': 'change date',
                                                       }}
                         />
                       </MuiPickersUtilsProvider>
                     </FormGroup>
                      </Col>
                    </Row>
                    <Row style={{marginTop:"20px"}}> 
                      <Button
                        style={{padding:'9px',margin:'auto'}}
                        onClick={()=>getReportByDate()}
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
                          setPeriodStartDate(periodList[event.target.value].start_date);
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
                          setPeriodEndDate(periodList[event.target.value].end_date);
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
              </Container>
              </Card>
              </Col>
              <Col  cW='30%'>
              </Col>
              <Col  cW='30%'>
              </Col>
            </Row>
            <Card marginBottom="20px" buttonMarginTop="5px" smallValue style={{height:'80px'}}>
              <Row>
                <Col>
                  <h3 style={{color:"green",marginBottom:"20px" }}><b>Merchant Name : </b>{merchantName} </h3> 
                 </Col>
                <Col>
                  <h3 style={{color:"green", marginBottom:"20px"}}><b>Branch Name : </b>{branchName} </h3>      
                </Col>
              </Row>
            </Card>
            

                <div>
                <InvoiceCards raised={billRaised} paid={billPaid} pending={billPending} counter={counterBill} />
                <AmountCards raised={amountRaised} paid={amountPaid} pending={amountPending} counter={counterAmount} />
                </div>

             {filter === 'period' ? (
               <Card bigPadding style={{width:'100%'}}>
               {/* <Button style={{float:'right'}}><CSVLink data={csvData}>Download as CSV</CSVLink></Button> */}
                     <h3 style={{color:"green" ,textAlign:"left"}}><b>Period List</b></h3>
                     {periodTableList && periodTableList.length > 0 ? (
                       <Table marginTop="34px">
                         <thead>
                           <tr>
                             <th>Period Name</th>
                             <th>Invoice Created</th>
                              <th>Amount Generated</th>
                              <th>Invoice Uploaded</th>
                              <th>Amount Uploaded</th>
                             <th>Invoice Paid</th>
                             <th>Amount Paid</th>
                             <th>Invoice Pending</th>
                             <th>Amount Pending</th>
                             <th>Counter Invoice</th>
                             <th>Counter Amount</th>
                           </tr>
                         </thead>
                         <tbody>{getPeriods()}</tbody>
                       </Table>
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
             ):''}
             {filter === 'daterange' ? (
               <Card bigPadding style={{width:'100%'}}>
               {/* <Button style={{float:'right'}}><CSVLink data={csvData}>Download as CSV</CSVLink></Button> */}
                     <h3 style={{color:"green" ,textAlign:"left"}}><b>Date List</b></h3>
                     {dateTableList && dateTableList.length > 0 ? (
                       <Table marginTop="34px">
                         <thead>
                           <tr>
                             <th>Date</th>
                             <th>Invoice Created</th>
                              <th>Amount Generated</th>
                              <th>Invoice Uploaded</th>
                              <th>Amount Uploaded</th>
                             <th>Invoice Paid</th>
                             <th>Amount Paid</th>
                             <th>Invoice Pending</th>
                             <th>Amount Pending</th>
                             <th>Counter Invoice</th>
                             <th>Counter Amount</th>
                           </tr>
                         </thead>
                         <tbody>{getDates()}</tbody>
                       </Table>
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
             ):''}
      {filter === 'billdate' ? (                                             
        <Card bigPadding style={{width:'100%'}}>
        <Button style={{float:'right'}}><CSVLink data={csvData}>Download as CSV</CSVLink></Button>
              <h3 style={{color:"green" ,textAlign:"left"}}><b>Invoice List</b></h3>
              {invoiceList && invoiceList.length > 0 ? (
                <Table marginTop="34px">
                  <thead>
                    <tr>
                      <th>Bill No</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Mobile No</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>{getInvoices()}</tbody>
                </Table>
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
      ):""}  
      <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{height:'80px'}}>
          <h4 style={{textAlign:'center'}}>Report generated at {`${new Date(formdate).getDate()}/${new Date(formdate).getMonth()+1}/${new Date(formdate).getFullYear()} ${new Date(formdate).getHours()}:${new Date(formdate).getMinutes()}`} </h4>
        </Card>
      </Container>
      <Footer bankname={bankName} banklogo={bankLogo}/>
    </Fragment>
  );
};

export default BranchReport;