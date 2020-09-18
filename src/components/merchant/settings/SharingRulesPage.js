import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import Loader from '../../shared/Loader';
import SettingSideBar from './SettingSidebar';
import Table from '../../shared/Table';
import { CURRENCY } from '../../constants';
import MiniPopUp from '../../shared/MiniPopUp';
import FormGroup from '../../shared/FormGroup';
import { getRules, ruleAPI } from '../api/MerchantAPI';

const SharingRulesPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [ruleList, setRules] = useState([]);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [approvalPopup, setApprovalPopup] = useState(false);
  const [ruleForApproval, setRuleForApproval] = useState({});

  const refreshRuleList = () => {
    setLoading(true);
    setRuleForApproval({});
    setApprovalPopup(false);
    getRules(props.ruleType).then((rules) => {
      setRules(rules.list);
      setLoading(rules.loading);
    });
  };

  useEffect(() => {
    refreshRuleList();
  }, []);

  const onApprovalPopupClick = (rule) => {
    setRuleForApproval(rule);
    setApprovalPopup(true);
  };

  const onCloseApprovalPopup = () => {
    setRuleForApproval({});
    setApprovalPopup(false);
  };

  const rules = () => {
    return ruleList.map((rule) => {
      const r = rule.ranges;
      if (rule.edited && rule.edited.ranges.length > 0) {
        rule.ranges = rule.edited.ranges;
        rule.merchant_approve_status = rule.edited.merchant_approve_status;
      }
      return (
        <tr key={rule._id}>
          <td>
            {rule.status === 0 ? (
              <span>{rule.name}</span>
            ) : (
              <span>{rule.name}</span>
            )}
          </td>
          <td className="tac">
            <span>
              {' '}
              {rule.type === 0 ? 'Wallet to Merchant': ''}
              {rule.type === 1 ? 'Non Wallet to Merchant' : ''}
              {rule.type === 2 ? 'Merchant Cashier to Merchant' : ''}
            </span>
          </td>
          <td>
            <div>
              {r.map((range) => {
                return (
                  <span key={r._id}>
                    Range:{' '}
                    {`${CURRENCY} ${range.trans_from} - ${CURRENCY} ${range.trans_to}`}{' '}
                    <br />
                    Fixed: {`${CURRENCY} ${range.fixed}`} <br />
                    Percentage: {`${range.percentage}`} <br />
                  </span>
                );
              })}
            </div>
          </td>

          <td className="tac bold">
            {rule.merchant_approve_status === 0 ? (
              <Button
                style={{ padding: '5px' }}
                onClick={() => onApprovalPopupClick(rule)}
                className="addBankButton"
              >
                <span>Approve</span>
              </Button>
            ) : rule.merchant_approve_status === 1 ? (
              <span>Approved</span>
            ) : (
              <span>Declined</span>
            )}
          </td>
        </tr>
      );
    });
  };

  const ranges = () => {
    return ruleForApproval.ranges.map((range) => (
      <tr key={range._id}>
        <td className="tac">{`${CURRENCY} ${range.trans_from} - ${CURRENCY} ${range.trans_to}`}</td>
        <td className="tac">{`${CURRENCY} ${range.fixed}`}</td>
        <td className="tac">{`${range.percentage}%`} </td>
      </tr>
    ));
  };

  if (isLoading) {
    return <Loader fullPage />;
  }
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | {props.ruleType} Rules</title>
      </Helmet>
      <MerchantHeader
        page="info"
        middleTitle={`${props.ruleType} Rule`}
        goto="/merchant/dashboard"
      />
      <Container verticalMargin>
        <SettingSideBar active={props.ruleType} />
        <Main big>
          <Card bigPadding topMargin="55px">
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>{props.ruleType} Rules</h3>
                <h5>Fees created by the Bank</h5>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Transaction Type</th>
                    <th>Ranges</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {' '}
                  {ruleList && ruleList.length > 0 ? rules() : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {approvalPopup ? (
        <MiniPopUp close={() => onCloseApprovalPopup()}>
          <div>
            <form>
              <p>
                <span id="popname">Approve Rule?</span>
              </p>
              <p>
                {' '}
                Rule Name : <span id="poptype">
                  {ruleForApproval.name}
                </span>{' '}
                <br />
                Transaction Type :
                <span id="poptype">
                  {' '}
                  {ruleForApproval.type === 0
                    ? 'Wallet to Merchant'
                    : 'Non-wallet to Merchant'}
                </span>
              </p>
              <br />
              <Row>
                <Table marginTop="34px" smallTd>
                  <thead>
                    <tr>
                      <th>Range</th>
                      <th>Fixed</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ruleForApproval.ranges && ruleForApproval.ranges.length > 0
                      ? ranges()
                      : null}
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    {approvalLoading ? (
                      <Button
                        filledBtn
                        marginTop="50px"
                        accentedBtn
                        disabled
                        type="button"
                      >
                        <Loader />
                      </Button>
                    ) : (
                      <Button
                        filledBtn
                        marginTop="50px"
                        accentedBtn
                        style={{ padding: '8px' }}
                        type="button"
                        onClick={() =>
                          ruleAPI(props, props.ruleType, 'decline', {
                            fee_id: ruleForApproval._id,
                          }).then(() => {
                            refreshRuleList();
                          })
                        }
                      >
                        <span>Decline</span>
                      </Button>
                    )}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    {approvalLoading ? (
                      <Button filledBtn marginTop="50px" disabled type="button">
                        <Loader />
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          ruleAPI(props, props.ruleType, 'approve', {
                            fee_id: ruleForApproval._id,
                            commission_id: ruleForApproval._id,
                          }).then(() => {
                            refreshRuleList();
                          })
                        }
                        filledBtn
                        marginTop="50px"
                        style={{ padding: '8px' }}
                        type="button"
                      >
                        <span>Approve</span>
                      </Button>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </div>
        </MiniPopUp>
      ) : null}
    </Wrapper>
  );
};
export default SharingRulesPage;
