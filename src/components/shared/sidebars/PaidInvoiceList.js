import React, { useEffect, useState } from 'react';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Loader from '../../shared/Loader';
import Table from '../../shared/Table';
import { STATIC_URL, CURRENCY } from '../../constants';


const PaidInvoiceList = (props) => {
  const currentDate = new Date();
  const merchant = JSON.parse(localStorage.getItem('cashierLogged')).merchant;

  const [invoiceList, setInvoiceList] = useState(
    props.invoiceList
  );
  
  const getInvoiceList = () =>
    invoiceList.map((invoice, index) => (
      <tr key={invoice._id}>
        <td
          className="tac"
        >
         {invoice.number}
        </td>
        <td className="tac">{invoice.name}</td>
        <td className="tac">{invoice.amount}</td>
        <td className="tac">{invoice.penalty}</td>
        <td className="tac">
          {invoice.amount + invoice.penalty}</td>
        <td className="tac">{invoice.due_date} </td>
        <td className="tac bold">
          <div
            style={{
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'center',
              color: 'green',
            }}
          >
            <span onClick={() => props.setEditingInvoice(invoice, invoice.penalty)}>
              View
            </span>
          </div>
        </td>
      </tr>
    ));



  useEffect(() => {
  }, []);

  return (
    <div>
      <Card>
        <div className="cardHeader">
          <div className="cardHeaderLeft">
            <img
              src={`${STATIC_URL}${merchant.logo}`}
              alt=""
              style={{ height: '60px', width: '60px', paddingRight: '10px' }}
            />
          </div>
          <div className="cardHeaderRight">
            <h4 style={{ color: 'green' }}>{merchant.name}</h4>
            <p>{merchant.description}</p>
          </div>
        </div>
        <div />
        {invoiceList && invoiceList.length > 0 ? (
          <Table marginTop="5px" smallTd>
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Penalty</th>
                <th>Total Amount</th>
                <th>Due Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceList && invoiceList.length > 0 ? getInvoiceList() : null}
            </tbody>
          </Table>
        ) : (
            <center><h2>No Bill Available Found</h2></center>
          )
        }
      </Card >
    </div >
  );
};

export default PaidInvoiceList;
