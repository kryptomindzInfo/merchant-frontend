import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CSVLink, CSVDownload } from "react-csv";
import StaffHeader from '../../shared/headers/cashier/StaffHeader';
import Container from '../../shared/Container';
import Table from '../../shared/Table';
import Card from '../../shared/Card';
import Col from '../../shared/Col';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import SelectInput from '../../shared/SelectInput';
import FormGroup from '../../shared/FormGroup';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CURRENCY } from '../../constants';
import DateFnsUtils from '@date-io/date-fns';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import Footer from '../../Footer';
import {
  fetchInvoicesBydate,
  getMerchantSettings,
  fetchInvoicesByPeriod,
  fetchInvoicesByDateRange,
} from '../api/CashierAPI';
import Loader from '../../shared/Loader';
import { Height } from '@material-ui/icons';
const today = new Date();
const StaffReportPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const bankName = JSON.parse(localStorage.getItem('cashierLogged')).bank.name;
  const bankLogo = JSON.parse(localStorage.getItem('cashierLogged')).bank.logo;
  const [invoiceList, setInvoiceList] = useState([]);
  const [periodList, setPeriodList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [filter, setFilter] = useState('billdate');
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');
  const cashierName = JSON.parse(localStorage.getItem('cashierLogged')).staff.name;
  const branchName = JSON.parse(localStorage.getItem('cashierLogged')).branch.name;
  const merchantName = JSON.parse(localStorage.getItem('cashierLogged')).merchant.name;
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
    getMerchantSettings().then((data) => {
      console.log(data.bill_period_list);
      setPeriodList(data.bill_period_list);
      setStartDate(data.bill_period_list[0].start_date);
      setEndDate(new Date());
    });
  };

  const getReportByPeriod = async() => {
    setLoading(true);
    const start = startOfDay(new Date(startDate));
    const end = endOfDay(new Date(endDate));
    const res = await fetchInvoicesByPeriod(start,end);
    const csvDATA = await fetchCSVData(res.list);
    setAmount(
    res.list.reduce((a, b) => {
    return a + b.amount;
    }, 0));
    setcsvData([["BillNo","Name","Amount","Mobile","DueDate"],...csvDATA.res])
    setInvoiceList(res.list);
    setLoading(csvDATA.loading);
  };

  const getReportByDateRange = async() => { 
  setLoading(true);
  const start = startOfDay(new Date(startDate));
  const end = endOfDay(new Date(endDate));
  const res = await fetchInvoicesByDateRange(start,end);
  const csvDATA = await fetchCSVData(res.list);
  setAmount(
  res.list.reduce((a, b) => {
  return a + b.amount;
  }, 0));
  setcsvData([["BillNo","Name","Amount","Mobile","DueDate"],...csvDATA.res])
  setInvoiceList(res.list);
  setLoading(csvDATA.loading);
  };

  const getReportByDate = async() => { 
      setLoading(true);
      const date = `${formdate.getDate() + 1 < 10 ? `0${formdate.getDate()}` : formdate.getDate()
      }/${formdate.getMonth() + 1 < 10
        ? `0${formdate.getMonth() + 1}`
        : formdate.getMonth() + 1
      }/${formdate.getFullYear()}`;
      const res = await fetchInvoicesBydate(date);
      const csvDATA = await fetchCSVData(res.list);
      setAmount(
      res.list.reduce((a, b) => {
      return a + b.amount;
      }, 0));
      setcsvData([["BillNo","Name","Amount","Mobile","DueDate"],...csvDATA.res])
      setInvoiceList(res.list);
      setLoading(csvDATA.loading);
    
  };

  const toggle = (type) => {
    if(type==='daterange'){
      setEndDate(new Date());
    }
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
      <StaffHeader active="reports" />
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
                          setStartDate(periodList[event.target.value].start_date);
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
                          setEndDate(periodList[event.target.value].end_date);
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
                <Card marginBottom="54px" buttonMarginTop="32px" smallValue style={{height:'180px', textAlign:'center'}}>
                  <h4 style={{marginTop:'50px'}}>Bill Gererated</h4>
                  <div className="cardValue">{invoiceList.length}</div>
                </Card>
              </Col>
              <Col  cW='30%'>
                <Card
                  marginBottom="54px"
                  buttonMarginTop="32px"
                  smallValue
                  style={{
                    height:'180px',
                    textAlign:'center',
                  }}>
                  <h4 style={{marginTop:'50px'}}>Amount</h4>
                  <div className="cardValue">XOF: {amount}</div>
                </Card>
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
          <Col>
          <h3 style={{color:"green", marginBottom:"20px"}}><b>Cashier Name : </b>{cashierName} </h3> 
             
          </Col>
          </Row>
      </Card>
      {/* </ActionBar> */}
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
      </Container>
      <Footer bankname={bankName} banklogo={bankLogo}/>
    </Fragment>
  );
};

export default StaffReportPage;