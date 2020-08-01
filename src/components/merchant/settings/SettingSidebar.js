import React, { Component } from 'react';
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/PersonAdd';
import FolderIcon from '@material-ui/icons/Folder';
import SettingsIcon from '@material-ui/icons/Settings';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import Card from '../../shared/Card';
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
    const revenue = this.props.active === 'Revenue';
    const commission = this.props.active === 'Commission';
    const zonesettings = this.props.active === 'ZoneSettings';
    const billperiodsettings = this.props.active === 'BillPeriodSettings';
    const billtermsettings = this.props.active === 'BillTermSettings';
    const countrysettings = this.props.active === 'CountrySettings';

    return (
      <SidebarStyle marginRight>
        <h3>SETTINGS</h3>
        <A href="/merchant/settings">
          <Card rounded selected={info} className="sideNav">
            <i className="material-icons">
              <PersonIcon />
            </i>
            <h3>Personal Info</h3>
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
        <A href="/merchant/settings/fee-rules">
          <Card rounded selected={revenue} className="sideNav">
            <i className="material-icons">
              <MobileScreenShareIcon />
            </i>
            <h3>Fee Rules</h3>
          </Card>
        </A>
        <A href="/merchant/settings/commission-rules">
          <Card rounded selected={commission} className="sideNav">
            <i className="material-icons">
              <MobileScreenShareIcon />
            </i>
            <h3>Commission Rules</h3>
          </Card>
        </A>
        <A href="/merchant/settings/zoneSettings">
          <Card rounded selected={zonesettings} className="sideNav">
            <i className="material-icons">
              <SettingsIcon />
            </i>
            <h3>Zone Settings</h3>
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
        <A href="/merchant/settings/country">
          <Card rounded selected={countrysettings} className="sideNav">
            <i className="material-icons">
              <SettingsIcon />
            </i>
            <h3>Country Settings</h3>
          </Card>
        </A>
      </SidebarStyle>
    );
  }
}

export default SettingSidebar;
