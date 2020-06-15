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
    const rules = getRules(props.ruleType);
    setRules(rules.list);
    setLoading(rules.loading);
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
      const r = rule.revenue_sharing_rule.infra_share;
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
            {rule.status === 0 ? (
              <span>{rule.trans_type}</span>
            ) : (
              <span>{rule.trans_type}</span>
            )}
          </td>
          <td>
            <div>
              Fixed: <span className="green">{`${CURRENCY} ${r.fixed}`}</span>,
              Percentage: <span className="green">{r.percentage}</span>
            </div>
          </td>

          <td className="tac bold">
            {rule.status === 2 ? (
              <Button
                onClick={() => onApprovalPopupClick(rule)}
                className="addBankButton"
              >
                <span>Approve</span>
              </Button>
            ) : rule.status === 1 ? (
              <span>Approved</span>
            ) : (
              <span>Declined</span>
            )}
          </td>
        </tr>
      );
    });
  };

  if (isLoading) {
    return <Loader fullPage />;
  }
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | {props.ruleType} Sharing Rules</title>
      </Helmet>
      <MerchantHeader
        page="info"
        middleTitle={`${props.ruleType} Revenue Sharing Rules`}
        goto="/dashboard"
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
                <h3>{props.ruleType} Sharing Rules</h3>
                <h5>Fees created by the infra</h5>
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
                <tbody>{rules && rules.length > 0 ? rules() : null}</tbody>
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
                <span id="popname">demo</span>
              </p>
              <p>
                {' '}
                Sending from <span id="poptype">demo</span>
              </p>
              <div>
                Fixed: <span className="green">{`${CURRENCY} 100`}</span>,
                Percentage: <span className="green">2</span>
              </div>

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
                        type="button"
                        onClick={() =>
                          ruleAPI(
                            props,
                            props.ruleType,
                            'decline',
                            ruleForApproval,
                          )
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
                          ruleAPI(
                            props,
                            props.ruleType,
                            'approve',
                            ruleForApproval,
                          )
                        }
                        filledBtn
                        marginTop="50px"
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
