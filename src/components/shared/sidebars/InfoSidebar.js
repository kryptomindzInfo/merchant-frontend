import React, { Component } from 'react';
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/PersonAdd';
import BlockIcon from '@material-ui/icons/Block';
import FolderIcon from '@material-ui/icons/Folder';
import EditIcon from '@material-ui/icons/Edit';
import ChartIcon from '@material-ui/icons/InsertChartOutlined';
import A from '../A';
import Card from '../Card';

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

class InfoSidebar extends Component {
  editSignal = (event) => {
    this.props.edit();
  };

  blockSignal = (event) => {
    this.props.block();
  };

  render() {
    const cashier = this.props.active === 'cashier';
    const info = this.props.active === 'info';
    const reports = this.props.active === 'reports';
    const edit = this.props.active === 'edit';
    const block = this.props.active === 'block';
    const bt = this.props.blockTxt === 1 ? 'Block' : 'Unblock';
    const infoType = this.props.type;
    return (
      <SidebarStyle marginRight>
        <A href={`/bank/branch/${this.props.branchId}`}>
          <Card rounded selected={info} className="sideNav">
            <i className="material-icons">
              <PersonIcon />
            </i>
            <h3>{infoType} Info</h3>
          </Card>
        </A>
        {infoType === 'Branch' ? (
          <A href={`/bank/cashiers/${this.props.branchId}`}>
            <Card rounded selected={cashier} className="sideNav">
              <i className="material-icons">
                <FolderIcon />
              </i>

              <h3>Cashier</h3>
            </Card>
          </A>
        ) : null}
        <A href="/reports/">
          <Card rounded selected={reports} className="sideNav">
            <i className="material-icons">
              <ChartIcon />
            </i>
            <h3>Reports</h3>
          </Card>
        </A>

        <Card
          rounded
          selected={edit}
          className="sideNav"
          onClick={this.editSignal}
        >
          <i className="material-icons">
            <EditIcon />
          </i>
          <h3>Edit</h3>
        </Card>

        <Card
          rounded
          selected={block}
          className="sideNav"
          onClick={this.blockSignal}
        >
          <i className="material-icons">
            <BlockIcon />
          </i>

          <h3>{bt}</h3>
        </Card>
      </SidebarStyle>
    );
  }
}

export default InfoSidebar;
