import React, { useEffect } from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Card from '../../shared/Card';
import Table from '../../shared/Table';
import { fetchOfferingList, deleteOffering } from '../api/MerchantAPI';
import CreateOfferingPopup from './CreateOfferingPopup';

function OfferingCard(props) {
  const [offeringList, setOfferingList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [popupType, setPopupType] = React.useState('new');
  const [addOfferingPopup, setAddOfferingPopup] = React.useState(false);
  const [editingOffering, setEditingOffering] = React.useState({});

  const handleOfferingPopupClick = (type, offering) => {
    setEditingOffering(offering);
    setPopupType(type);
    setAddOfferingPopup(true);
  };

  const onPopupClose = () => {
    setAddOfferingPopup(false);
  };

  const refreshOfferingList = async () => {
    setLoading(true);
    fetchOfferingList().then((data) => {
      setOfferingList(data.list);
      setLoading(data.loading);
    });
  };

  useEffect(() => {
    refreshOfferingList();
  }, []);

  const getOfferings = () => {
    return offeringList.map((offering) => {
      return (
        <tr key={offering._id}>
          <td className="tac">{offering.name}</td>
          <td className="tac">{offering.code}</td>
          <td className="tac">
            {offering.type === '0' ? 'Product' : 'Service'}
          </td>
          <td className="tac">{offering.denomination}</td>
          <td className="tac">{offering.unit_of_measure}</td>
          <td className="tac bold">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <td className="tac">{offering.unit_price}</td>
              <span className="absoluteMiddleRight primary popMenuTrigger">
                <i className="material-icons ">more_vert</i>
                <div className="popMenu">
                  <span
                    onClick={() => handleOfferingPopupClick('update', offering)}
                  >
                    Edit
                  </span>
                  <span
                    onClick={async () =>
                      deleteOffering(offering._id).then(() => {
                        refreshOfferingList();
                      })
                    }
                  >
                    Delete
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
      <Card bigPadding>
        <div className="cardHeader">
          <div className="cardHeaderLeft">
            <SupervisedUserCircleIcon className="material-icons" />
          </div>
          <div className="cardHeaderRight">
            <h3>Offering List</h3>
          </div>
        </div>
        <div className="cardBody">
          <Table marginTop="34px" smallTd>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Type</th>
                <th>Denomination</th>
                <th>Unit of measure</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {offeringList && offeringList.length > 0 ? getOfferings() : null}
            </tbody>
          </Table>
        </div>
      </Card>
      {addOfferingPopup ? (
        <CreateOfferingPopup
          type={popupType}
          offering={editingOffering}
          refreshOfferingList={(data) => refreshOfferingList()}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </div>
  );
}

export default OfferingCard;
