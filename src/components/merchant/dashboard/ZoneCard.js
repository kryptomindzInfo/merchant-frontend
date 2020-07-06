import React, { useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AddIcon from '@material-ui/icons/Add';
import ActionBar from '../../shared/ActionBar';
import Table from '../../shared/Table';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import CreateZonePopup from './CreateZonePopup';
import { fetchZoneList } from '../api/MerchantAPI';
import A from '../../shared/A';
import history from '../../utils/history';

function ZoneCard(props) {
  const [openZonePopup, setZonePopup] = React.useState(false);
  const [zoneList, setZoneList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingZone, setEditingZone] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);

  const handleZonePopupClick = (type, zone) => {
    setEditingZone(zone);
    setPopupType(type);
    setZonePopup(true);
  };

  const onPopupClose = () => {
    setZonePopup(false);
  };

  const refreshZoneList = async () => {
    const data = await fetchZoneList();
    setZoneList(data.list);
    setLoading(data.loading);
    props.refreshZone();
  };

  useEffect(() => {
    setLoading(true);
    const getZoneList = async () => {
      const data = await fetchZoneList();
      setZoneList(data.list);
      setLoading(data.loading);
    };
    getZoneList();
  }, []); // Or [] if effect doesn't need props or state

  const getZones = () => {
    return zoneList.map((zone) => {
      return (
        <tr key={zone._id}>
          <td className="tac">{zone.name}</td>
          <td className="tac">
            {zone.branches_count === undefined
              ? 'No branch found'
              : zone.branches_count}
          </td>
          <td className="tac bold">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <td className="tac">{zone.code}</td>
              <span className="absoluteMiddleRight primary popMenuTrigger">
                <i className="material-icons ">more_vert</i>
                <div className="popMenu">
                  <span
                    onClick={() => {
                      localStorage.setItem('selectedZone', zone._id);
                      localStorage.setItem('currentZone', JSON.stringify(zone));
                      history.push(`/merchant/${zone._id}/branches`);
                    }}
                  >
                    <span>Branches</span>
                  </span>
                  <span onClick={() => handleZonePopupClick('update', zone)}>
                    Edit
                  </span>
                </div>
              </span>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div style={{ marginBottom: '50px' }}>
      <ActionBar
        marginBottom="33px"
        inputWidth="calc(100% - 241px)"
        className="clr"
      >
        <div className="iconedInput fl">
          <i className="material-icons">
            <SearchIcon />
          </i>
          <input type="text" placeholder="Search Zones" />
        </div>

        <Button
          className="addBankButton"
          flex
          onClick={() => handleZonePopupClick('new', {})}
        >
          <AddIcon className="material-icons" />
          <span>Add Zone</span>
        </Button>
      </ActionBar>
      <Card bigPadding>
        <div className="cardHeader">
          <div className="cardHeaderLeft">
            <SupervisedUserCircleIcon className="material-icons" />
          </div>
          <div className="cardHeaderRight">
            <h3>Zone List</h3>
          </div>
        </div>
        <div className="cardBody">
          <Table marginTop="34px" smallTd>
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Branches</th>
                <th>Zone ID</th>
              </tr>
            </thead>
            <tbody>{zoneList && zoneList.length > 0 ? getZones() : null}</tbody>
          </Table>
        </div>
      </Card>
      {openZonePopup ? (
        <CreateZonePopup
          type={popupType}
          zone={editingZone}
          refreshZoneList={(data) => refreshZoneList(data)}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </div>
  );
}

export default ZoneCard;
