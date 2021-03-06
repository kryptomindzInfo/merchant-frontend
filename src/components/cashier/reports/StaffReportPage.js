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
import ActionBar from '../../shared/ActionBar';
import FormGroup from '../../shared/FormGroup';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CURRENCY } from '../../constants';
import DateFnsUtils from '@date-io/date-fns';
import Footer from '../../Footer';
import { fetchInvoicesBydate } from '../api/CashierAPI';
import Loader from '../../shared/Loader';
import { Height } from '@material-ui/icons';
const today = new Date();
const StaffReportPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const bankName = JSON.parse(localStorage.getItem('cashierLogged')).bank.name;
  const bankLogo = JSON.parse(localStorage.getItem('cashierLogged')).bank.logo;
  const [invoiceList, setInvoiceList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem('cashierLogged')).cashier,
  );
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

  const getReport = async() => {
    setLoading(true);
    const date = `${formdate.getDate() + 1 < 10 ? `0${formdate.getDate()}` : formdate.getDate()
    }/${formdate.getMonth() + 1 < 10
      ? `0${formdate.getMonth() + 1}`
      : formdate.getMonth() + 1
    }/${formdate.getFullYear()}`;
    const res = await fetchInvoicesBydate(date);
    const csvDATA = await fetchCSVData(res.list);
    console.log(csvDATA);
    setAmount(
    res.list.reduce((a, b) => {
      return a + b.amount;
    }, 0));
    setcsvData([["BillNo","Name","Amount","Mobile","DueDate"],...csvDATA.res])
    setInvoiceList(res.list);
    setLoading(csvDATA.loading);
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
    getReport();
  }, []);

  // const status = () => {
  //   setInterval(function(){
  //     getStats();
  //    }, 3000);
  // };

  // useEffect(() => {
  //   status();      
  // }, []); // Or [] if effect doesn't need props or state

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
      {/* <ActionBar
              marginBottom="15px"
              marginTop="15px"
              inputWidth="calc(100% - 241px)"
              className="clr"
              style={{display:"block"}}
            > */}
            <Row>
              <Col cW='40%'>
              <Card marginBottom="54px" buttonMarginTop="32px" smallValue style={{height:'150px'}}>
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
                <Card marginBottom="54px" buttonMarginTop="32px" smallValue style={{height:'150px', textAlign:'center'}}>
                  <h4 style={{marginTop:'30px'}}>Bill Gererated</h4>
                  <div className="cardValue">{invoiceList.length}</div>
                </Card>
              </Col>
              <Col  cW='30%'>
                <Card
                  marginBottom="54px"
                  buttonMarginTop="32px"
                  smallValue
                  style={{
                    height:'150px',
                    textAlign:'center',
                  }}>
                  <h4 style={{marginTop:'30px'}}>Amount</h4>
                  <div className="cardValue">XOF: {amount}</div>
                </Card>
              </Col>
            </Row>
              
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