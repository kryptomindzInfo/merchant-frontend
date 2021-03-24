import React, { Component } from 'react';
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/PersonAdd';
import FolderIcon from '@material-ui/icons/Folder';
import SettingsIcon from '@material-ui/icons/Settings';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import Card from '../../shared/Card';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import A from '../../shared/A';

const SidebarStyle = styled.aside`
  width: 260px;
  float: left;
  margin-right: ${(props) => (props.marginRight ? '33px' : '0')};
  .anchor {
    display: block;
  }
  :hover {
    color: #fff;
  }
  .material-icons {
    margin-right: 10px;
    margin-top: 0;
    color: #417505;
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
`;

const H3 = styled.h3`
  font-size: 11px;
  font-weight: bold;
  color: #323c47;
`;

const H1 = styled.h1`
  font-size: 28px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #417505;
  text-align: center;
`;

class SettingSidebar extends Component {
  render() {
    const info = this.props.active === 'info';
    const documents = this.props.active === 'documents';
    const fee = this.props.active === 'fee';
    const interbankfee = this.props.active === 'interbankfee';
    const interbankcommission = this.props.active === 'interbankcommission';
    const commission = this.props.active === 'commission';
    const zonesettings = this.props.active === 'ZoneSettings';
    const billperiodsettings = this.props.active === 'BillPeriodSettings';
    const billtermsettings = this.props.active === 'BillTermSettings';
    const penaltysettings = this.props.active === 'PenaltySettings';
    const categorysettings = this.props.active === 'CategorySettings';

    return (
      <SidebarStyle marginRight>
        <h3>SETTINGS</h3>
        <A href="/merchant/settings">
          <Card rounded selected={info} className="sideNav">
            <i className="material-icons">
              <PersonIcon />
            </i>
            <h3>Merchant Info</h3>
          </Card>
        </A>
        <A>
          <Card rounded selected={documents} className="sideNav">
            <i className="material-icons">
              <FolderIcon />
            </i>
            <h3>Documents</h3>
          </Card>
        </A>
        <Card rounded className="containerNav">
        <h4>Intra Bank Rules</h4>
        <Card display="flex">
          <Row style={{width:'-webkit-fill-available'}}>
            <Col cW="50%">
              <A href={`/merchant/settings/fee-rules`}>
                <Card rounded selected={fee} className="sideNav">
                  <h3>Fee</h3>
                </Card>
              </A>
            </Col>
            <Col cW="50%">
              <A href={`/merchant/settings/commission-rules`}>
                <Card rounded selected={commission} className="sideNav">
                  <h3>Commission</h3>
                </Card>
              </A>
            </Col>
          </Row>
        </Card>
      </Card>
      <Card rounded className="containerNav">
        <h4>Inter Bank Rules</h4>
        <Card display="flex">
         <Row style={{width:'-webkit-fill-available'}}>
            <Col cW="50%">
              <A href={`/merchant/settings/interbank-fee-rules`}>
                <Card rounded selected={interbankfee} className="sideNav">
                  <h3>Fee</h3>
                </Card>
              </A>
            </Col>
            <Col cW="50%">
              <A href={`/merchant/settings/inter-bank-commission-rules`}>
                <Card rounded selected={interbankcommission} className="sideNav">
                  <h3>Commission</h3>
                </Card>
              </A>
            </Col>
          </Row>
        </Card>
      </Card>
        <A href="/merchant/settings/zoneSettings">
          <Card rounded selected={zonesettings} className="sideNav">
            <i className="material-icons">
              <SettingsIcon />
            </i>
            <h3>Zone Settings</h3>
          </Card>
        </A>
        <A href="/merchant/settings/categorySettings">
          <Card rounded selected={categorysettings} className="sideNav">
            <i className="material-icons">
              <SettingsIcon />
            </i>
            <h3>Category Settings</h3>
          </Card>
        </A>
        <A href="/merchant/settings/billTermSettings">
          <Card rounded selected={billtermsettings} className="sideNav">
            <i className="material-icons">
              <SettingsIcon />
            </i>
            <h3>Bill Term Settings</h3>
          </Card>
        </A>
        <A href="/merchant/settings/billPeriodSettings">
          <Card rounded selected={billperiodsettings} className="sideNav">
            <i className="material-icons">
              <SettingsIcon />
            </i>
            <h3>Period Settings</h3>
          </Card>
        </A>
        <A href="/merchant/settings/penalty">
          <Card rounded selected={penaltysettings} className="sideNav">
            <i className="material-icons">
              <SettingsIcon />
            </i>
            <h3>Penalty Rules</h3>
          </Card>
        </A>
      </SidebarStyle>
    );
  }
}

export default SettingSidebar;
