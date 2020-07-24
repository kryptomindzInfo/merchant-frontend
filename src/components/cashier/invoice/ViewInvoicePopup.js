import React from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Popup from '../../shared/Popup';
import Card from '../../shared/Card';
import Table from '../../shared/Table';
import Col from '../../shared/Col';
import Row from '../../shared/Row';

function ViewInvoicePopup(props) {
  const getItems = () => {
    return props.invoice.items.map((item) => {
      return (
        <tr key={item._id}>
          <td>{item.item_desc.name}</td>
          <td>{item.item_desc.description}</td>
          <td>{item.item_desc.code}</td>
          <td>{item.item_desc.denomination}</td>
          <td>{item.item_desc.unit_of_measure}</td>
          <td>{item.item_desc.unit_price}</td>
          <td>{item.quantity}</td>
          <td>{item.total_amount}</td>
        </tr>
      );
    });
  };

  return (
    <Popup bigBody accentedH1 close={props.onClose.bind(this)}>
      <h1>{props.invoice.name}</h1>
      <Card bigPadding>
        <div>
          <Row>
            <Col cW="33%" style={{ display: 'row', alignItems: 'left' }}>
              <Row style={{ display: 'flex', justifyContent: 'left' }}>
                <h3>Number: </h3>
                <h3 style={{ marginLeft: '5px' }}>{props.invoice.number}</h3>
              </Row>
              <Row style={{ display: 'flex', justifyContent: 'left' }}>
                <h3>Name: </h3>
                <h3 style={{ marginLeft: '5px' }}>{props.invoice.name}</h3>
              </Row>
              <Row style={{ display: 'flex', justifyContent: 'left' }}>
                <h3>Mobile: </h3>
                <h3 style={{ marginLeft: '5px' }}>{props.invoice.mobile}</h3>
              </Row>
            </Col>
            <Col cW="33%">
              <Row style={{ display: 'flex', justifyContent: 'left' }}>
                <h3>Due Date: </h3>
                <h3 style={{ marginLeft: '5px' }}>{props.invoice.due_date}</h3>
              </Row>
              <Row style={{ display: 'flex', justifyContent: 'left' }}>
                <h3>Bill Date: </h3>
                <h3 style={{ marginLeft: '5px' }}>{props.invoice.bill_date}</h3>
              </Row>
              <Row style={{ display: 'flex', justifyContent: 'left' }}>
                <h3>Bill Period: </h3>
                <h3 style={{ marginLeft: '5px' }}>
                  {props.invoice.bill_period.period_name}
                </h3>
              </Row>
            </Col>
            <Col cW="33%">
              <Row style={{ display: 'flex', justifyContent: 'left' }}>
                <h3>Amount: </h3>
                <h3 style={{ marginLeft: '5px' }}>{props.invoice.amount}</h3>
              </Row>
            </Col>
          </Row>
        </div>
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
                <th>Denomination</th>
                <th>Unit of measure</th>
                <th>Unit Price</th>
                <th>Quantity</th>
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
      </Card>
    </Popup>
  );
}

export default ViewInvoicePopup;
