import React, { useEffect } from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import AddIcon from '@material-ui/icons/Add';
import Card from '../../shared/Card';
import Table from '../../shared/Table';
import Button from '../../shared/Button';
import ActionBar from '../../shared/ActionBar';
import { fetchOfferingList, deleteOffering } from '../api/MerchantAPI';
import CreateOfferingPopup from './CreateOfferingPopup';
import UploadOfferingPopup from './UploadOfferingPopup';
import DeletePopup from '../../shared/DeletePopup';

function OfferingCard(props) {
  const [offeringList, setOfferingList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [popupType, setPopupType] = React.useState('new');
  const [addOfferingPopup, setAddOfferingPopup] = React.useState(false);
  const [editingOffering, setEditingOffering] = React.useState({});
  const [uploadOfferingPopup, setUploadOfferingPopup] = React.useState(false);
  const [deleteOfferingPopup, setDeleteOfferingPopup] = React.useState(false);
  const [deletingOffering, setDeletingOffering] = React.useState({});

  const handleOfferingPopupClick = (type, offering) => {
    setEditingOffering(offering);
    setPopupType(type);
    setAddOfferingPopup(true);
  };

  const onPopupClose = () => {
    setAddOfferingPopup(false);
  };

  const handleUploadOfferingPopupClick = () => {
    setUploadOfferingPopup(true);
  };

  const onUploadOfferingPopupClose = () => {
    setUploadOfferingPopup(false);
  };

  const handleDeleteOfferingPopupClick = (offering) => {
    setDeletingOffering(offering);
    setDeleteOfferingPopup(true);
  };

  const onDeleteOfferingPopupClose = () => {
    setDeleteOfferingPopup(false);
  };

  const refreshOfferingList = async () => {
    setLoading(true);
    fetchOfferingList().then((data) => {
      setOfferingList(data.list);
      setLoading(data.loading);
    });
    props.refreshoffering();
  };

  const handleDeleteOffering = (offering) => {
    deleteOffering(offering._id).then(() => {
      refreshOfferingList();
      setDeleteOfferingPopup(false);
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
          <td className="tac">{offering.description}</td>
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
                    onClick={() => handleDeleteOfferingPopupClick(offering)}
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
      <ActionBar
        marginBottom="33px"
        inputWidth="calc(100% - 241px)"
        className="clr"
      >
        <div className="iconedInput fl">
          <i className="material-icons">
            <SearchIcon />
          </i>
          <input type="text" placeholder="Search Offering" />
        </div>

        <Button className="addBankButton" flex>
          <i className="material-icons">add</i>
          <span>Add Offering</span>
        </Button>
        <Button
          className="addBankButton"
          flex
          onClick={() => handleUploadOfferingPopupClick()}
        >
          <AddIcon className="material-icons" />
          <span>Upload Offering</span>
        </Button>
      </ActionBar>
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
                <th>Description</th>
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
      {uploadOfferingPopup ? (
        <UploadOfferingPopup
          refreshOfferingList={() => refreshOfferingList()}
          onClose={() => onUploadOfferingPopupClose()}
        />
      ) : null}
      {deleteOfferingPopup ? (
        <DeletePopup
          element={deletingOffering}
          onClose={() => onDeleteOfferingPopupClose()}
          delete={handleDeleteOffering}
          header="Offering"
        />
      ) : null}
    </div>
  );
}

export default OfferingCard;
