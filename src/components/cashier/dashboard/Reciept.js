import React, { Component } from 'react';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Container from '../../shared/Container';
import Table from '../../Table';


const date = new Date()

export class Reciept extends Component {

  getInvoiceList = () =>
    this.props.values.map((node,index) => (
      <tr key={node.invoice._id}>
        <td className="tac">{node.invoice.number}</td>
        <td className="tac">{node.invoice.amount}</td>
        <td className="tac">{node.penalty}</td>
        <td className="tac">
        {node.invoice.amount+node.penalty}</td>
        <td className="tac">{node.invoice.due_date} </td>
        <td className="tac bold">
          <div
            style={{
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'center',
              color: 'green',
            }}
          >
            <span>
              Paid
            </span>
          </div>
        </td>
      </tr>
    ));
  componentDidMount() {
    console.log(this.props.values);
  }
    render() {
      return (
      <Container>
        <Row vAlign="flex-start">
          <Col md="12">
         
         `` <div
              style={{
              fontSize: '34px',
              fontWeight: 'bold',
              padding: '13px 0px',
              textAlign: 'center',
              color: '#417505',
            }}
          >
              Transaction Receipt
            </div>
          <hr style={{border: '1px solid black'}}></hr>
            <Row>
              <Col className="popInfoLeft">Transaction ID :</Col>
                <Col className="popInfoRight">
                  67648821974200954
              </Col>
            </Row>
          </Col>
        </Row>
        <hr style={{border: '1px solid black'}}></hr>
        <Table marginTop="34px" smallTd>
          <thead>
            <tr>
              <th>Number</th>
              <th>Amount</th>
              <th>Penalty</th>
              <th>Total Amount</th> 
              <th>Due Date</th>
              <th />
            </tr>
            </thead>
            <tbody>
              {this.getInvoiceList()}
            </tbody>
        </Table>
        <hr style={{border: '1px solid black'}}></hr>
          <Row>
            <Col >
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  padding: '13px 0px',
                  color: '#417505',
                }}
              >
                Signature: ____________________
              </div>
            </Col>
            <Col></Col>
          </Row>
      </Container>
      );
    }
  }
