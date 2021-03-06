import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CSVLink, CSVDownload } from "react-csv";
import CashierHeader from '../../shared/headers/cashier/CashierHeader';
import Container from '../../shared/Container';
import Table from '../../shared/Table';
import Card from '../../shared/Card';
import Col from '../../shared/Col';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import ActionBar from '../../shared/ActionBar';
import FormGroup from '../../shared/FormGroup';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CURRENCY } from '../../constants';
import DateFnsUtils from '@date-io/date-fns';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import format from 'date-fns/format';
import Footer from '../../Footer';

import { getCashierReport, fetchStats, fetchCashierStats, getCashierDailyReport } from '../api/CashierAPI';
import Loader from '../../shared/Loader';
const today = new Date();
const CashierReportPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [stats, setStats] = useState({});
  const [cashierstats, setCashierStats] = useState({});
  const [dailyreprots, setDailyReports] = useState({});
  const cashierName = JSON.parse(localStorage.getItem('cashierLogged')).staff.name;
  const branchName = JSON.parse(localStorage.getItem('cashierLogged')).branch.name;
  const merchantName = JSON.parse(localStorage.getItem('cashierLogged')).merchant.name;
  const bankName = JSON.parse(localStorage.getItem('cashierLogged')).bank.name;
  const bankLogo = JSON.parse(localStorage.getItem('cashierLogged')).bank.logo;
  const [totalAmountCredited, setTotalAmountCredited] = useState(0);
  const [formdate, setFormdate] = useState(new Date());
  const [csvData, setcsvData] = useState([]);

  const getStats = () => {
    fetchStats('cashier')
      .then((data) => {
        setStats(data.stats);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getCashierStats = () => {
    fetchCashierStats()
      .then((data) => {
        console.log(data);
        setCashierStats(data.stats);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const fetchCSVData = async(list) => {
    const csvlist = list.map(async (invoice) => {
        return (
          [
            `${format(new Date(invoice.createdAt), 'dd-MM-yyyy')}`,
            invoice.transaction ? invoice.transaction.invoiceDetails.customer_code : '',
            invoice.transaction ? invoice.transaction.invoiceDetails.name : '',
            invoice.transaction ? invoice.transaction.invoiceDetails.number : '',
            invoice.transaction ? invoice.transaction.total_amount : '',
            invoice.cash_in_hand.toFixed()
          ]
        );
    });
    const result= await Promise.all(csvlist);
    return({res:result, loading:false});
  };

  const getReport = async() => {
    setLoading(true);
    const start = startOfDay(new Date(formdate));
    const end = endOfDay(new Date(formdate));
    const stats = await getStats();
    const cashierstats = await getCashierStats();
    const dailyreport = await getCashierDailyReport(start,end);
    console.log(dailyreport);
    const res = await getCashierReport(start,end);
    
      const csvDATA = await fetchCSVData(res.data.transactions);
      setTotalAmountCredited(
      res.data.transactions.reduce((a, b) => {
        return a + b.transaction ? b.transaction.total_amount : 0;
      }, 0));
      setcsvData([["Date","CustomerNumber","CustomerName","InvoiceAmount","CashInHand"],...csvDATA.res])
      setInvoiceList(res.data.transactions);
      if(dailyreport.data.reports.length>0){
        setDailyReports(dailyreport.data.reports[0]);
      }
      setLoading(csvDATA.loading);

    
  };

  const getInvoices = () => {
    return invoiceList.reverse().map((invoice) => {
      return (
        <tr key={invoice._id}>
          <td>
            {`${format(new Date(invoice.createdAt), 'dd-MM-yyyy')}`}</td>
          <td>
            {invoice.transaction ? invoice.transaction.invoiceDetails.customer_code : ''}</td>
          <td>
          {invoice.transaction ? invoice.transaction.invoiceDetails.name : ''}
          </td>
          <td>{ invoice.transaction ? invoice.transaction.invoiceDetails.number : ''}</td>
          <td>{CURRENCY} {invoice.transaction ? invoice.transaction.total_amount : ''}</td>
          <td>{CURRENCY} {invoice.cash_in_hand.toFixed()}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    getReport();
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
      <CashierHeader active="reports" />
      <Container verticalMargin>
      <Row style={{marginBottom:"0px"}}>
              <Col cW='40%'>
              <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{height:'150px'}}>
                <Container>
                
                <h2 style={{color:"green"}}><b>Date</b></h2> 
                  <Row>
                    <Col cW='60%'>
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
                    <Col cW='40%'> 
                      <Button
                        style={{padding:'9px'}}
                        onClick={()=>getReport()}
                      >
                        Get Report
                      </Button>
                </Col>
                  </Row>
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
          <Col>
          <h3 style={{color:"green", marginBottom:"20px"}}><b>Cashier Name : </b>{cashierName} </h3> 
             
          </Col>
          </Row>
      </Card>
      <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{height:'80px'}}>
        <Row>
        <Col>
          <h3
            style={{color:"green",marginBottom:"20px" }}>
              <b>Opening Date: </b>
              {dailyreprots.opening_time ?
              `${new Date(dailyreprots.opening_time).getDay()}/${new Date(dailyreprots.opening_time).getMonth()+1}/${new Date(dailyreprots.opening_time).getFullYear()}`
              :

              `${new Date().getDay()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
              }
            </h3> 
          </Col>
          <Col>
          <h3 style={{color:"green", marginBottom:"20px"}}><b>Opening Time : </b>{dailyreprots.opening_time ?
          `${new Date(dailyreprots.opening_time).getHours()}:${new Date(dailyreprots.opening_time).getMinutes()}`
          : 
          `${new Date(cashierstats.openingTime).getHours()}:${new Date(cashierstats.openingTime).getMinutes()}`} 
          </h3>      
          </Col>
          <Col>
          <h3 style={{color:"green",marginBottom:"20px" }}><b>Opening Balance : </b>{CURRENCY} {dailyreprots.opening_balance ? dailyreprots.opening_balance : cashierstats.openingBalance} </h3> 
          </Col>
          <Col>
          <h3 style={{color:"green", marginBottom:"20px"}}><b>Closing Time : </b>{dailyreprots.opening_time ?
          `${new Date(dailyreprots.closing_time).getHours()}:${new Date(dailyreprots.closing_time).getMinutes()}`
          : 
          "Day is Open"}
          </h3> 
          </Col>
          </Row>
      </Card>
        
           
            <Row style={{backgroundColor:"lightgray", marginBottom:"20px",marginTop:"0px"}}>
            <Col >
            <Card
                horizontalMargin="7px"
                cardWidth="-webkit-fill-available"
                h4FontSize="16px"
                smallValue
                textAlign="center"
                col
                style={{backgroundColor:"lightgray"}}
              >
                <h4>Total Bills</h4>
                <div className="cardValue">
                  {
                    <span> {invoiceList.length}</span>
                  }
                </div>
              </Card>
            </Col>
            <Col>
            <Card
                horizontalMargin="7px"
                cardWidth="-webkit-fill-available"
                h4FontSize="16px"
                smallValue
                textAlign="center"
                col
                style={{
                  backgroundColor:"lightgray",
                  borderStyle:"hidden hidden hidden solid",
                  borderColor:"grey"
                }}
              >
                <h4>Paid Date</h4>
                <div className="cardValue">
                {`${format(new Date(formdate), 'dd-MM-yyyy')}`}
                </div>
              </Card>
            </Col>
            <Col>
            <Card
                horizontalMargin="7px"
                cardWidth="-webkit-fill-available"
                h4FontSize="16px"
                smallValue
                textAlign="center"
                col
                style={{
                  backgroundColor:"lightgray",
                  borderStyle:"hidden hidden hidden solid",
                  borderColor:"grey"
                }}
              >
                <h4>Amount Collected</h4>
                <div className="cardValue">
                {CURRENCY} {totalAmountCredited}
                </div>
              </Card>
            </Col>
            <Col>
            <Card
                horizontalMargin="7px"
                cardWidth="-webkit-fill-available"
                smallValue
                h4FontSize="16px"
                textAlign="center"
                col
                style={{
                  backgroundColor:"lightgray",
                  borderStyle:"hidden hidden hidden solid",
                  borderColor:"grey"
                }}
              >
                <h4>Cash Counted</h4>
                <div className="cardValue">
                {CURRENCY} {dailyreprots.opening_balance && dailyreprots.closing_balance ?
                  dailyreprots.closing_balance-dailyreprots.opening_balance : "-"}
                </div>
              </Card>
            </Col>
            <Col>
            <Card
                horizontalMargin="7px"
                cardWidth="-webkit-fill-available"
                smallValue
                h4FontSize="16px"
                textAlign="center"
                col
                style={{
                  backgroundColor:"lightgray",
                  borderStyle:"hidden hidden hidden solid",
                  borderColor:"grey"
                }}
              >
                <h4>Descripency</h4>
                <div className="cardValue">
                {CURRENCY} {dailyreprots.descripency ? dailyreprots.descripency : "-"}
                </div>
              </Card>
            </Col>
          </Row>
          
            <Card bigPadding style={{width:'100%'}}>
        <Button style={{float:'right'}}><CSVLink data={csvData}>Download as CSV</CSVLink></Button>
              <h3 style={{color:"green" ,textAlign:"left"}}><b>Invoice Paid (cash to cash)</b></h3>
        {invoiceList && invoiceList.length > 0 ? (
                <Table marginTop="34px">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Customer Number</th>
                      <th>Customer Name</th>
                      <th>Invoice Number</th>
                      <th>Invoice Amount</th>
                      <th>Cash In Hand</th>
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
        <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{height:'80px'}}>
          <h4 style={{textAlign:'center'}}>Report generated at {`${new Date(formdate).getDay()}/${new Date(formdate).getMonth()+1}/${new Date(formdate).getFullYear()} ${new Date(formdate).getHours()}:${new Date(formdate).getMinutes()}`} </h4>
        </Card>
      </Container>
      <Footer bankname={bankName} banklogo={bankLogo}/>
    </Fragment>
  );
};

export default CashierReportPage;