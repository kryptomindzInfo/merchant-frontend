import React, { useEffect, useState } from 'react';
import Button from '../../Button';
import Card from '../../Card';
import Col from '../../Col';
import FormGroup from '../../FormGroup';
import Loader from '../../Loader';
import Row from '../../Row';
import Table from '../../Table';
import { STATIC_URL } from '../constants';
import { checkCashierFee, getPenaltyRule } from './api/CashierMerchantAPI';

const PayBillsInvoiceList = (props) => {
  const currentDate = new Date();
  const merchant  = JSON.parse(localStorage.getItem('cashierLogged')).merchant;
  const [isLoading, setLoading] = useState(true);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [selectedInvoiceList, setSelectedInvoiceList] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [feeList, setFeeList] = useState([]);
  const [penaltyList, setPenaltyList] = useState([]);
  const [penaltyRule, setPenaltyRule] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceList, setInvoiceList] = useState(
    props.invoiceList.filter((i) => i.paid === 0),
  );
  const handleCheckboxClick = async (e, invoice, index) => {
    setButtonLoading(true);
    if(e.target.checked) {
      if(invoice.has_counter_invoice === true){
        const counterInvoice = invoiceList.filter((val) => val.number === `${invoice.number}C`);
        setTotalAmount(totalAmount + invoice.amount + counterInvoice[0].amount + penaltyList[index]);
        const data = await checkCashierFee({
          amount: totalAmount + invoice.amount + counterInvoice[0].amount + penaltyList[index],
        });
        setTotalFee(data.fee);
        const obj1 = {
          id: invoice._id,
          penalty: penaltyList[index],
        }
        const obj2 = {
          id: counterInvoice[0]._id,
          penalty: 0,
        }
        const list = [...selectedInvoiceList];
        list.push(obj1);
        list.push(obj2);
        setSelectedInvoiceList(list);
        setButtonLoading(false);
      } else {
        setTotalAmount(totalAmount + invoice.amount + penaltyList[index]);
        const data = await checkCashierFee({
          amount: totalAmount + invoice.amount + penaltyList[index],
        });
        setTotalFee(data.fee);
        const obj1 = {
          id: invoice._id,
          penalty: penaltyList[index],
        }
        const list = [...selectedInvoiceList];
        list.push(obj1);
        setSelectedInvoiceList(list);
        setButtonLoading(false);
      }
    } else {
      if(invoice.has_counter_invoice === true){
        const counterInvoice = invoiceList.filter((val) => val.number === `${invoice.number}C`);
        const data = await checkCashierFee({
          amount: totalAmount - invoice.amount - counterInvoice[0].amount - penaltyList[index],
        });
        setTotalFee(data.fee);
        const list = selectedInvoiceList.filter((val) => val.id !== invoice._id &&  val.id !== counterInvoice[0]._id);
        setSelectedInvoiceList(list);
        setTotalAmount(totalAmount-invoice.amount-counterInvoice[0].amount - penaltyList[index]);
        setButtonLoading(false);
      } else {
        const data = await checkCashierFee({
          amount: totalAmount - invoice.amount - penaltyList[index],
        });
        setTotalFee(data.fee);
        const list = selectedInvoiceList.filter((val) => val.id !== invoice._id);
        setSelectedInvoiceList(list);
        setTotalAmount(totalAmount- invoice.amount - penaltyList[index]);
        setButtonLoading(false);
      }
    }
  };

  const handleMultipleInvoiceSubmit = () => {
    const obj = {
      invoices : selectedInvoiceList,
    }
    props.showOTPPopup(obj);
  };
  
  const getInvoiceList = () =>
    invoiceList.map((invoice,index) => (
      <tr key={invoice._id}>
        <td
          className="tac"
        >
          <Row>
            <Col cW="10%">
            {invoice.is_counter ? (
              <div>
                {selectedInvoiceList.map(a => a.id).includes(invoice._id) ? (
                  <FormGroup>
                    <input
                      type="checkbox"
                      checked
                      value={invoice._id}>
                    </input>
                  </FormGroup>
                ) : (
                  <FormGroup>
                    <input
                      type="checkbox"
                      disabled
                      value={invoice._id}>
                    </input>
                  </FormGroup>
                )}
              </div>
            ) : (
              <FormGroup onChange={(e) => handleCheckboxClick(e, invoice, index)}>
                <input
                  type="checkbox"
                  value={invoice._id}>
                </input>
                </FormGroup>
            )}
            </Col>
            <Col 
              cW="90%"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {invoice.number}
            </Col>
          </Row>
        </td>
        <td className="tac">{invoice.amount}</td>
        <td className="tac">{penaltyList[index]}</td>
        <td className="tac">
          {feeList[index] > 0 ? feeList[index].toFixed(2) : 'NA'}
        </td>
        <td className="tac">
        {feeList[index] > 0 ? invoice.amount+feeList[index]+penaltyList[index] : 'NA'}</td>
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
            <span onClick={() => props.setEditingInvoice(invoice)}>
              Pay Bill
            </span>
          </div>
        </td>
      </tr>
    ));

  const fetchfee = async(penaltylist) => {
    const feelist = invoiceList.map(async (invoice,index) => {
      if (invoice.amount + penaltylist[index] < 0) {
        const data = await checkCashierFee({
          amount: invoice.amount * -1,
        });
        return (-data.fee);
      } else {
        const data = await checkCashierFee({
          amount: invoice.amount + penaltylist[index],
        });
        return (data.fee);
      }
    })
    const result= await Promise.all(feelist);
    return({res:result, loading:false});
  }

  const calculatePenalty = async(rule) => {
    const penaltylist = invoiceList.map(async invoice => {
      if (invoice.amount < 0) {
        return (0);
      }
      const datesplit = invoice.due_date.split("/");
      const dueDate = new Date(datesplit[0],datesplit[1],datesplit[2]);
      if (currentDate.getDate() <= dueDate.getDate()) {
          return (0);
      } else {
        if(rule.type === 'once') {
            return (rule.fixed_amount + (invoice.amount*rule.percentage)/100);
        } else {
            const diffDays = currentDate.getDate() - dueDate.getDate();
            return ((rule.fixed_amount + (invoice.amount*rule.percentage)/100)*diffDays);
        }
      }
    });
    const result= await Promise.all(penaltylist);
    return(result);
  };

  const fetchPenaltyRule = async() => {
    const data = await getPenaltyRule({});
    console.log(data);
    return(data.rule);
  }

  useEffect(() => {
    setLoading(true);
    const getRule = async() => {
      const res1= await fetchPenaltyRule();
      const res2= await calculatePenalty(res1);
      setPenaltyList(res2);
      const res3= await fetchfee(res2);
      setFeeList(res3.res);
      setLoading(res3.loading);
    }
    getRule();
    }, []); 

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Card>
        <div className="cardHeader">
          <div className="cardHeaderLeft">
            <img
              src={`${STATIC_URL}/${merchant.logo}`}
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
        <Table marginTop="34px" smallTd>
          <thead>
            <tr>
              <th>Number</th>
              <th>Amount</th>
              <th>Penalty</th>
              <th>Fees</th>
              <th>Amount With Fees</th> 
              <th>Due Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {invoiceList && invoiceList.length > 0 ? getInvoiceList() : null}
          </tbody>
        </Table>
        <FormGroup>
          {totalAmount > 0 ? (
            <Button onClick={handleMultipleInvoiceSubmit} filledBtn>
              {isButtonLoading ? (
                <Loader />
              ) : (
                `Collect Amount ${totalAmount} + Fee ${totalFee} = Total ${
                  totalAmount + totalFee
                } and Pay Bill`
              )}
            </Button>
          ) : null}
        </FormGroup>
      </Card>
    </div>
  );
};

export default PayBillsInvoiceList;
