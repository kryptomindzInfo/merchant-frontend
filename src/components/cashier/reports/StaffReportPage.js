import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
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

import { fetchInvoicesBydate } from '../api/CashierAPI';
import Loader from '../../shared/Loader';
const today = new Date();
const StaffReportPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem('cashierLogged')).cashier,
  );
  const [formdate, setFormdate] = useState(new Date());

  const getReport = async() => {
    setLoading(true);
    const date = `${formdate.getDate() + 1 < 10 ? `0${formdate.getDate()}` : formdate.getDate()
    }/${formdate.getMonth() + 1 < 10
      ? `0${formdate.getMonth() + 1}`
      : formdate.getMonth() + 1
    }/${formdate.getFullYear()}`;
    const res = await fetchInvoicesBydate(date);
    setAmount(
    res.list.reduce((a, b) => {
      return a + b.amount;
    }, 0))
    setInvoiceList(res.list);
    setLoading(res.loading);
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
      <ActionBar
              marginBottom="15px"
              marginTop="15px"
              inputWidth="calc(100% - 241px)"
              className="clr"
            >
              <Row>
              <h4 style={{color:"green"}}><b>Select Date for report</b></h4>
              </Row>
              
              <Row>
                    <Col>
                      <FormGroup>
                      <MuiPickersUtilsProvider
                       utils={DateFnsUtils}
                                                >
                        <KeyboardDatePicker
                        id="date-picker-dialog"
                        label="Date"
                        size="small"
                        fullWidth
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
                    <Col>
                      <Button
                        style={{padding:'9px'}}
                        onClick={()=>getReport()}
                      >Get Report</Button>
                   
                      
                </Col>

              </Row>
      </ActionBar>
      <Row>
          <Col cW="50%">
            <Card marginBottom="54px" buttonMarginTop="32px" smallValue>
              <h4>No of bill Gererated</h4>
              <div className="cardValue">{invoiceList.length}</div>
              </Card>
           </Col>
           <Col cW="50%">
            <Card marginBottom="54px" buttonMarginTop="32px" smallValue>
              <h4>Amount of bill Gererated</h4>
              <div className="cardValue">{amount}</div>
              </Card>
           </Col>
      </Row>
        <Main>
              <h3 style={{color:"green" ,textAlign:"left"}}><b>Invoice List</b></h3>
        {invoiceList && invoiceList.length > 0 ? (
                <Table marginTop="34px" smallTd>
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
                    }}
                  >
                    No invoice found
                  </h3>
                )}
        </Main>
      </Container>
    </Fragment>
  );
};

export default StaffReportPage;