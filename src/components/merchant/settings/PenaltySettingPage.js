import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../shared/Wrapper';
import ActionBar from '../../shared/ActionBar';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import SettingSideBar from './SettingSidebar';
import Table from '../../shared/Table';
import PenaltyRulePopup from './PenaltyRulePopup';
import { getPenaltyRule } from '../api/MerchantAPI';

const PenaltySettingPage = (props) => {
  const [penaltyRulePopup, setPenaltyRulePopup] = React.useState(false);
  const [penaltyRule, setPenaltyRule] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const handlePenaltyRulePopupClick = () => {
    setPenaltyRulePopup(true);
  };

  const onPopupClose = () => {
    setPenaltyRulePopup(false);
  };

  const refreshPenaltyRule = async () => {
    setLoading(true);
    getPenaltyRule().then((data) => {
      console.log(data);
      setPenaltyRule(data.penalty_rule);
      setLoading(data.loading);
    });
  };

  useEffect(() => {
    refreshPenaltyRule();
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Penalty Rules</title>
      </Helmet>
      <MerchantHeader page="info" goto="/merchant/dashboard" />
      <Container verticalMargin>
        <SettingSideBar active="PenaltySettings" />
        <Main big>
          <Card bigPadding topMargin="55px">
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>{props.ruleType} Penalty Rule</h3>
              </div>
            </div>
            <div className="cardBody">
              <Row>
                <Col cw="80%">
                  <Row>
                    <Col cw="50%">
                      <h2>Rule Type:</h2>
                    </Col>
                    <Col cw="50%">
                      <h2>{penaltyRule ? penaltyRule.type === 'once' ? 'Flat Penalty' : 'Perday Penalty' : ''}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col cw="50%">
                      <h2>Fixed Amount:</h2>
                    </Col>
                    <Col cw="50%">
                      <h2>{penaltyRule ? penaltyRule.fixed_amount : ''}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col cw="50%">
                      <h2>Percentage:</h2>
                    </Col>
                    <Col cw="50%">
                      <h2>{penaltyRule ? penaltyRule.percentage : ''}</h2>
                    </Col>
                  </Row>
                </Col>
                <Col cw="20%">
                  <Button
                    style={{ padding: '5px' }}
                    type="submit"
                    onClick={() => handlePenaltyRulePopupClick()}
                  >
                    {penaltyRule ? "Edit" : "Create"}
                    {/* Create */}
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        </Main>
      </Container>
      {penaltyRulePopup ? (
        <PenaltyRulePopup
          penaltyrule={penaltyRule}
          refreshpenaltyrule={(data) => refreshPenaltyRule(data)}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
};
export default PenaltySettingPage;
