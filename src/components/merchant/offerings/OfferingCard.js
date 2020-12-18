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
  const [copyofferingList, setcopyOffering] = React.useState([]);

  const [productList, setProductList] = React.useState([]);
  const [serviceList, setServiceList] = React.useState([]);
  const [toggleButton, setToggleButton] = React.useState('product');
  const [isLoading, setLoading] = React.useState(false);
  const [popupType, setPopupType] = React.useState('new');
  const [addOfferingPopup, setAddOfferingPopup] = React.useState(false);
  const [editingOffering, setEditingOffering] = React.useState({});
  const [uploadOfferingPopup, setUploadOfferingPopup] = React.useState(false);
  const [deleteOfferingPopup, setDeleteOfferingPopup] = React.useState(false);
  const [deletingOffering, setDeletingOffering] = React.useState({});

  const toggleService = () => {
    if (toggleButton !== 'service') {
      setToggleButton('service');
    }
  };

  const toggleProduct = () => {
    if (toggleButton !== 'product') {
      setToggleButton('product');
    }
  };

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

  const setOffering = (list) => {
    setOfferingList(list);
    const products = list.filter((offering) => {
      return offering.type === '0';
    });
    const services = list.filter((offering) => {
      return offering.type === '1';
    });
    setProductList(products);
    setServiceList(services);
  };

  const refreshOfferingList = async () => {
    setLoading(true);
    fetchOfferingList().then((data) => {
      setOffering(data.list);
      setcopyOffering(data.list)
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
    return (toggleButton === 'product' ? productList : serviceList).map(
      (offering) => {
        return (
          <tr key={offering._id}>
            <td className="tac">{offering.name}</td>
            <td className="tac">{offering.description}</td>
            <td className="tac">{offering.code}</td>
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
                      onClick={() =>
                        handleOfferingPopupClick('update', offering)
                      }
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
      },
    );
  };

  const searchlistfunction = (value) => {
    console.log(value)


    const newfilterdata = copyofferingList.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );


    setOfferingList(newfilterdata)


  }

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
          <input type="text" placeholder="Search Offering Name" onChange={(e) => {
            searchlistfunction(e.target.value)
          }} />
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            marginTop: '10px',
          }}
        >
          <Button
            className={toggleButton === 'product' ? 'active' : ''}
            onClick={toggleProduct}
            marginRight="5px"
            padding="5px"
          >
            Product
          </Button>
          <Button
            className={toggleButton === 'service' ? 'active' : ''}
            onClick={toggleService}
            marginLeft="20px"
          >
            Service
          </Button>
        </div>
        <div className="cardBody">
          <Table marginTop="34px" smallTd>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Code</th>
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
