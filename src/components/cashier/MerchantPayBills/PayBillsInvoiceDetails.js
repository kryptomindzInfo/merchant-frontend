import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import Table from '../../Table';
import Button from '../../Button';
import FormGroup from '../../FormGroup';
import Loader from '../../Loader';
import Row from '../../Row';
import Col from '../../Col';
import Container from '../../Container';
import * as Yup from 'yup';
import { correctFocus } from '../../handleInputFocus';
import { CURRENCY, STATIC_URL } from '../constants';

const PayBillsInvoiceDetails = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isDataLoading, setDataLoading] = useState(false);
  const [invoice, setInvoice] = useState(props.invoice);
  const [totalAmount, setTotalAmount] = useState(
    invoice.items.reduce(function (a, b) {
      return a + b.quantity * b.item_desc.unit_price;
    }, 0),
  );
  const [totalTax, setTotalTax] = useState(
    invoice.items.reduce(function (a, b) {
      return a + (b.total_amount - b.quantity * b.item_desc.unit_price);
    }, 0),
  );
  const { merchant } = props;

  const getItems = () =>
    invoice.items.map((item) => {
      return (
        <tr key={item._id}>
          <td className="tac">{item.item_desc.name}</td>
          <td className="tac">{item.item_desc.description}</td>
          <td className="tac">{item.item_desc.code}</td>
          <td className="tac">{item.item_desc.unit_of_measure}</td>
          <td className="tac">{item.item_desc.unit_price}</td>
          <td className="tac">{item.quantity}</td>
          <td className="tac">{item.quantity * item.item_desc.unit_price}</td>
          <td className="tac">{item.tax_desc.value}</td>
          <td className="tac">{item.total_amount}</td>
        </tr>
      );
    });

  const sumtotal2 = () => {
    return totalAmount + totalTax + props.penalty;
  };

  useEffect(() => {
    setDataLoading(true);
    correctFocus('update');
    setDataLoading(false);
  });
  return (
    <div>
      <Formik
        initialValues={{
          number: invoice.number || '',
          name: invoice.name || '',
          amount: invoice.amount || '',
          due_date: invoice.due_date || '',
          bill_date: invoice.bill_date || '',
          bill_period: invoice.bill_period || '',
          mobile: invoice.mobile || '',
          counter_invoices: invoice.counter_invoices || [],
        }}
        onSubmit={(values) => {
            const obj = {
              invoices : [{
                id: invoice._id,
                penalty: props.penalty,
              }]
            }
            const payinvoice = [{
              invoice: invoice,
              penalty: props.penalty,
            }]
            props.showOTPPopup(obj,payinvoice);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required.'),
          amount: Yup.number().required('Number is required.'),
          mobile: Yup.string()
            .min(10, 'number should be atleast 10 digits')
            .max(10, 'number cannot exceed 10 digits')
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              'Mobile no must be valid',
            )
            .required('Mobile no is required'),
        })}
      >
        {(formikProps) => {
          const { values } = formikProps;
          return (
            <Form>
              <Container>
                <Row style={{ marginBottom: '20px' }}>
                  <Col
                    cW="25%"
                    className="popInfoLeft"
                    style={{ marginRight: '-110px' }}
                  >
                    <div className="cardHeaderLeft">
                      <img
                        src={`${STATIC_URL}/${merchant.logo}`}
                        alt=""
                        style={{
                          height: '60px',
                          width: '60px',
                          paddingRight: '10px',
                          marginRight: '10px',
                        }}
                      />
                    </div>
                  </Col>
                  <Col cW="25%" className="popInfoRight">
                    <div className="cardHeader">
                      <div className="cardHeaderRight">
                        <h4 style={{ color: 'green' }}>{merchant.name}</h4>
                        <p>{merchant.description}</p>
                      </div>
                    </div>
                  </Col>
                  <Col cW="50%" />
                </Row>
                <Row>
                  <Col cW="33%">
                    <Row>
                      <Col className="popInfoLeft">Customer Code</Col>
                      {values.customer_code ? (
                        <Col className="popInfoRight">
                          {values.customer_code}
                        </Col>
                      ) : (
                        <Col className="popInfoRight">Passing by customer</Col>
                      )}
                    </Row>
                    <Row>
                      <Col className="popInfoLeft">Mobile</Col>
                      <Col className="popInfoRight">{values.mobile}</Col>
                    </Row>
                  </Col>
                  <Col cW="33%">
                    <Row>
                      <Col className="popInfoLeft">Bill No</Col>
                      <Col className="popInfoRight">{values.number}</Col>
                    </Row>
                    <Row>
                      <Col className="popInfoLeft">Bill Date</Col>
                      <Col className="popInfoRight">{values.bill_date}</Col>
                    </Row>
                  </Col>
                  <Col cW="33%">
                    <Row>
                      <Col className="popInfoLeft">Due Date</Col>
                      <Col className="popInfoRight">{values.due_date}</Col>
                    </Row>
                    <Row>
                      <Col className="popInfoLeft">Period</Col>
                      <Col className="popInfoRight">
                        {values.bill_period.period_name}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col cW="100%">
                    <Row />
                    <Table marginTop="34px" smallTd>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Code</th>
                          <th>Unit of measure</th>
                          <th>Unit price</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                          <th>Tax %</th>
                          <th>Amount with tax</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items && invoice.items.length > 0
                          ? getItems()
                          : null}
                      </tbody>
                    </Table>
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
                          <Col className="popInfoLeft">Penalty</Col>
                          <Col className="popInfoRight">{props.penalty}</Col>
                        </Row>
                        <Row>
                          <Col className="popInfoLeft">Sum Total</Col>
                          <Col className="popInfoRight">{sumtotal2()}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
              <FormGroup>
                {Number(values.amount < 0 || invoice.has_counter_invoice === true)? (
                  <h5 style={{ marginTop: '10px', textAlign: 'center' }}>
                    Can't process transaction right now
                  </h5>
                ) : (
                  <Button filledBtn>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <span>
                        Collect {CURRENCY} {sumtotal2()} and Pay Bill
                      </span>
                    )}
                  </Button>
                )}
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PayBillsInvoiceDetails;
