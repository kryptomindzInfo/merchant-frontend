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
  };


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
        <Main>
        <h3 style={{color:"green" ,textAlign:"left"}}><b>Invoices Paid (cash to cash)</b></h3>
        </Main>
      </Container>
    </Fragment>
  );
};

export default CashierReportPage;