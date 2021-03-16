import React from 'react';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Card from '../../shared/Card';
import { CURRENCY } from '../../constants';

const DashCards = (props) => {
  const no = props.no ? props.no : 0;
  const amount = props.amount ? props.amount : 0;
  const title = props.title ? props.title: 0;
  return (
    <Card marginBottom="20px" buttonMarginTop="32px" smallValue style={{textAlign:'center'}}>
        <h4>{title}</h4>
        <Row>
            <Col >
                <Row>
                    No.:
                </Row>
                <Row>
                    <span className="cardValue" > {no}</span>
                </Row>
            </Col>
            <Col >
                <Row>
                    Amount:
                </Row>
                <Row>
                    <span className="cardValue">{amount}</span>
                </Row>
            </Col>  
        </Row>
    </Card>
  );
};
export default DashCards;