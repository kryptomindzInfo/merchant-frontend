import React, { useEffect, useState } from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Popup from '../../shared/Popup';
import Card from '../../shared/Card';
import Table from '../../shared/Table';
import Col from '../../shared/Col';
import Row from '../../shared/Row';
import Container from '../../shared/Container';
import Button from '../../shared/Button';
import { invoiceApi } from '../api/CashierAPI';
import CounterInvoicePopup from './CounterInvoicePopup';

function ViewInvoicePopup(props) {
  const [counterInvoicePopup, setCounterInvoicePopup] = React.useState(false);
  const [totalAmount, setTotalAmount] = useState(
    props.invoice.items.reduce((a, b) => {
      return a + b.quantity * b.item_desc.unit_price;
    }, 0),
  );
  const [totalTax, setTotalTax] = useState(
    props.invoice.items.reduce((a, b) => {
      return a + (b.total_amount - b.quantity * b.item_desc.unit_price);
    }, 0),
  );
  const handleCounterInvoicePopup = () => {
    setCounterInvoicePopup(true);
  };

  const handleValidate = async () => {
    const values = {
      invoice_id: props.invoice._id,
      group_id: props.groupId,
      is_validated: 1,
    };
    await invoiceApi(props, values, 'update');
  };

  const getItems = () => {
    return props.invoice.items.map((item) => {
      return (
        <tr key={item._id}>
          <td>{item.item_desc.name}</td>
          <td>{item.item_desc.description}</td>
          <td>{item.item_desc.code}</td>
          <td>{item.item_desc.unit_of_measure}</td>
          <td>{item.item_desc.unit_price}</td>
          <td>{item.quantity}</td>
          <td>{item.tax_desc.value}</td>
          <td>{item.quantity * item.item_desc.unit_price}</td>
        </tr>
      );
    });
  };

  const getCounterInvoiceItems = () => {
    return props.invoice.counter_invoices.map((item) => {
      return (
        <tr key={item._id}>
          <td>{item.number}</td>
          <td>{item.description}</td>
          <td>{item.amount}</td>
        </tr>
      );
    });
  };

  const discount = () => {
    return props.invoice.counter_invoices.reduce((a, b) => {
      return a + b.amount;
    }, 0);
  };

  const sumtotal = () => {
    const totaldiscount = discount();
    return totalAmount + totalTax - totaldiscount;
  };

  const sumtotal2 = () => {
    return totalAmount + totalTax;
  };

  return (
    <Popup bigBody accentedH1 close={props.onClose.bind(this)}>
      <h1>{props.invoice.name}</h1>
      <Card bigPadding>
        <Container>
          <Row>
            <Col cW="33%">
              <Row>
                <Col className="popInfoLeft">Name</Col>
                <Col className="popInfoRight">{props.invoice.name}</Col>
              </Row>
              <Row>
                <Col className="popInfoLeft">Mobile</Col>
                <Col className="popInfoRight">{props.invoice.mobile}</Col>
              </Row>
            </Col>
            <Col cW="33%">
              <Row>
                <Col className="popInfoLeft">Bill No</Col>
                <Col className="popInfoRight">{props.invoice.number}</Col>
              </Row>
              <Row>
                <Col className="popInfoLeft">Bill Date</Col>
                <Col className="popInfoRight">{props.invoice.bill_date}</Col>
              </Row>
            </Col>
            <Col cW="33%">
              <Row>
                <Col className="popInfoLeft">Due Date</Col>
                <Col className="popInfoRight">{props.invoice.due_date}</Col>
              </Row>
              <Row>
                <Col className="popInfoLeft">Period</Col>
                <Col className="popInfoRight">
                  {props.invoice.bill_period.period_name}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
          <div className="cardBody">
            <Table marginTop="34px" smallTd>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Code</th>
                  <th>Unit of measure</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Tax %</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {props.invoice.items && props.invoice.items.length > 0
                  ? getItems()
                  : null}
              </tbody>
            </Table>
          </div>
          <Row style={{ marginTop: '8px' }}>
            <Col cW="50%">
              {props.invoice.counter_invoices.length > 0 ? (
                <div className="cardBody">
                  <div className="popInfoLeft">Counter Invoices</div>
                  <Table marginTop="5px" smallTd>
                    <thead>
                      <tr>
                        <th>Number</th>
                        <th>Description</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>{getCounterInvoiceItems()}</tbody>
                  </Table>
                </div>
              ) : null}
            </Col>
            <Col cW="25%"></Col>
            <Col cW="25%">
              <Row>
                <Col className="popInfoLeft">Total Amount</Col>
                <Col className="popInfoRight">{totalAmount}</Col>
              </Row>
              <Row>
                <Col className="popInfoLeft">Total Tax</Col>
                <Col className="popInfoRight">{totalTax}</Col>
              </Row>
              {props.invoice.counter_invoices.length > 0 ? (
                <Row>
                  <Col className="popInfoLeft">Total Discount</Col>
                  <Col className="popInfoRight">{discount()}</Col>
                </Row>
              ) : null}
              {props.invoice.counter_invoices.length > 0 ? (
                <Row>
                  <Col className="popInfoLeft">Sum Total</Col>
                  <Col className="popInfoRight">{sumtotal()}</Col>
                </Row>
              ) : (
                <Row>
                  <Col className="popInfoLeft">Sum Total</Col>
                  <Col className="popInfoRight">{sumtotal2()}</Col>
                </Row>
              )}
            </Col>
          </Row>
          {props.invoice.is_validated === 1 && props.invoice.paid === 0 ? (
            <Button
              type="button"
              filledBtn
              onClick={() => {
                handleCounterInvoicePopup();
              }}
              marginTop="10px"
              style={{
                padding: '5px',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 500,
              }}
            >
              <span>Raise Counter Invoice</span>
            </Button>
          ) : null}
        </Container>
      </Card>
      {counterInvoicePopup ? (
        <CounterInvoicePopup
          invoiceId={props.invoice._id}
          onClose={props.onClose}
          refreshInvoiceList={props.refreshInvoiceList}
        />
      ) : null}
    </Popup>
  );
}

export default ViewInvoicePopup;
