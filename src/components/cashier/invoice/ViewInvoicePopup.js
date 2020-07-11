import React from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Popup from '../../shared/Popup';
import Card from '../../shared/Card';
import Table from '../../shared/Table';

function ViewInvoicePopup(props) {
  const getItems = () => {
    return props.invoice.items.map((item) => {
      return (
        <tr key={item._id}>
          <td>{item.item_desc.name}</td>
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
      <h1>Invoice {props.invoice.name}</h1>
      <Card bigPadding>
        <div className="cardHeader">
          <div className="cardHeaderLeft">
            <SupervisedUserCircleIcon className="material-icons" />
          </div>
          <div className="cardHeaderRight">
            <h3>Item List</h3>
            <h5>List of invoice items</h5>
          </div>
        </div>
        <div className="cardBody">
          <Table marginTop="34px" smallTd>
            <thead>
              <tr>
                <th>Name</th>
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
