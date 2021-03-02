import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
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
import Footer from '../../Footer';

import { getCashierReport } from '../api/CashierAPI';
import Loader from '../../shared/Loader';
const today = new Date();
const CashierReportPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [cashierInfo, setCashierInfo] = useState(
    JSON.parse(localStorage.getItem('cashierLogged')).cashier,
  );
  const [formdate, setFormdate] = useState(new Date());

  const getReport = async() => {
    const yesterday = new Date(formdate)
    yesterday.setDate(yesterday.getDate() - 1)
    const res = await getCashierReport(yesterday,formdate);
    console.log(res);
    setInvoiceList(res.data.transactions);
  };

  const getInvoices = () => {
    return invoiceList.map((invoice) => {
      return (
        <tr key={invoice._id}>
          <td>{`${new Date(invoice.createdAt).getHours()}:${new Date(invoice.createdAt).getMinutes()}`}</td>
          <td>{invoice._id}</td>
          <td>
            -
          </td>
          <td>{invoice.txType}</td>
          <td>Completed</td>
          <td>-</td>
          <td>{CURRENCY} {invoice.amount}</td>
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
              </Col>
              <Col  cW='30%'>
              </Col>
            </Row>
            <Card bigPadding style={{width:'100%'}}>
        {/* <Button style={{float:'right'}}><CSVLink data={csvData}>Download as CSV</CSVLink></Button> */}
              <h3 style={{color:"green" ,textAlign:"left"}}><b>Invoice Paid (cash to cash)</b></h3>
        {invoiceList && invoiceList.length > 0 ? (
                <Table marginTop="34px">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Transaction ID</th>
                      <th>Description</th>
                      <th>Transaction Type</th>
                      <th>Transaction Status</th>
                      <th>Cash In Hand</th>
                      <th>Credit</th>
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
        </Card>
      </Container>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default CashierReportPage;