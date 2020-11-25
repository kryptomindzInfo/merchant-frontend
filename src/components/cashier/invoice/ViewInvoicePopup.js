import React, { useEffect, useState } from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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

  const handleValidate = async () => {
    const values = {
      invoice_id: props.invoice._id,
      group_id: props.groupId,
      is_validated: 1,
    };
    await invoiceApi(props, values, 'update');
  };

  const getItems = () => {
    console.log(props.invoice);
    return props.invoice.items.map((item) => {
      return (
        <tr key={item._id}>
          <td>{item.item_desc.name}</td>
          <td>{item.item_desc.description}</td>
          <td>{item.item_desc.code}</td>
          <td>{item.item_desc.unit_of_measure}</td>
          <td>{item.item_desc.unit_price}</td>
          <td>{item.quantity}</td>
          <td>{item.quantity * item.item_desc.unit_price}</td>
          <td>{item.tax_desc.value}</td>
          <td>{item.total_amount}</td>
        </tr>
      );
    });
  };


  return (
    <Popup bigBody accentedH1 close={props.onClose.bind(this)}>
      <h1>{props.invoice.name}</h1>
      <Card bigPadding>
        <Container>
          <Row>
            <Col cW="33%">
              <Row>
                <Col className="popInfoLeft">Customer Code</Col>
                {props.invoice.customer_code ? (
                  <Col className="popInfoRight">
                    {props.invoice.customer_code}
                  </Col>
                ) : (
                  <Col className="popInfoRight">Passing by customer</Col>
                )}
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
                  <th>Amount</th>
                  <th>Tax %</th>
                  <th>Amount with tax</th>
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
            <Col cW="50%"></Col>
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
              <Row>
                <Col className="popInfoLeft">Sum Total</Col>
                <Col className="popInfoRight">{props.invoice.amount}</Col>
              </Row>
            </Col>
          </Row>
          {props.invoice.is_validated === 0 ? (
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Col cW="25%">
                <Button
                  type="button"
                  filledBtn
                  onClick={() => {
                    props.edit('update', props.invoice, 'invoice');
                  }}
                  marginTop="10px"
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  <span>
                    <i className="material-icons" style={{ marginRight: '2%' }}>
                      <EditIcon />
                    </i>
                    Edit
                  </span>
                </Button>
              </Col>
              <Col cW="25%">
                <Button
                  type="button"
                  filledBtn
                  onClick={() => {
                    props.delete(props.invoice._id);
                  }}
                  marginTop="10px"
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  <span>
                    <i className="material-icons" style={{ marginRight: '2%' }}>
                      <DeleteIcon />
                    </i>
                    Delete
                  </span>
                </Button>
              </Col>
            </Row>
          ) : null}
        </Container>
      </Card>
    </Popup>
  );
}

export default ViewInvoicePopup;
