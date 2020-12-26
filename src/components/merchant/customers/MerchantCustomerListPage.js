import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Loader from '../../shared/Loader';
import Container from '../../shared/Container';
import ActionBar from '../../shared/ActionBar';
import Table from '../../shared/Table';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import UploadCustomerPopup from './UploadCustomerPopup';
import CreateCustomerPopup from './CreateCustomerPopup';
import Card from '../../shared/Card';
// import DeletePopup from '../../shared/DeletePopup';
import { uploadCustomer, fetchCustomerList } from '../api/MerchantAPI';

const MerchantCustomerListPage = () => {
  const [addCustomerPopup, setAddCustomerPopup] = React.useState(false);
  const [customerList, setCustomerList] = React.useState([]);
  const [copyCustomerList, setCopyCustomerList] = React.useState([]);
  const [popupType, setPopupType] = React.useState('new');
  const [editingCustomer, setEditingCustomer] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [deleteCustomerPopup, setDeleteCustomerPopup] = React.useState(false);
  const [uploadCustomerPopup, setUploadCustomerPopup] = React.useState(false);

  // const handleCustomerPopupClick = (type, customer) => {
  //   setEditingCustomer(customer);
  //   setPopupType(type);
  //   setAddCustomerPopup(true);
  // };

  // const onPopupClose = () => {
  //   setAddCustomerPopup(false);
  // };

  const refreshCustomerList = async () => {
    setLoading(true);
    fetchCustomerList().then((data) => {
      setCustomerList(data.list);
      setCopyCustomerList(data.list)
      setLoading(data.loading);
    });
  };

  const handleUploadCustomerPopupClick = () => {
    setUploadCustomerPopup(true);
  };

  const onUploadCustomerPopupClose = () => {
    setUploadCustomerPopup(false);
  };

  // const handleDeleteTaxPopupClick = (offering) => {
  //   setDeletingTax(offering);
  //   setDeleteTaxPopup(true);
  // };

  // const onDeleteTaxPopupClose = () => {
  //   setDeleteTaxPopup(false);
  // };

  // const handleDeleteTax = (tax) => {
  //   deleteTax(tax._id).then(() => {
  //     refreshTaxList();
  //     setDeleteTaxPopup(false);
  //   });
  // };
  const getCustomerList = () => {
    return customerList.map((customer) => {
      return (
        <tr key={customer._id}>
          <td customer="tac">{customer.name}</td>
          <td className="tac">{customer.mobile}</td>
          <td className="tac">{customer.email}</td>
          <td className="tac">{customer.customer_code}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    refreshCustomerList();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }

  const searchlistfunction = (value) => {
    const newfilterdata = copyCustomerList.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );
    setCustomerList(newfilterdata)
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Customers</title>
      </Helmet>
      <MerchantHeader active="customers" />
      <Container verticalMargin>
        <Main>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">
                <SearchIcon />
              </i>
              <input type="text" placeholder="Search Customers" onChange={(e) => {
                searchlistfunction(e.target.value)
              }} />
            </div>

            <Button
              className="addBankButton"
              flex
              // onClick={() => handleCustomerPopupClick('new', {})}
              onClick={() =>
                setAddCustomerPopup(true)
              }

            >
              <AddIcon className="material-icons" />
              <span>Create Customer</span>
            </Button>
            <Button
              className="addBankButton"
              flex
              onClick={() => handleUploadCustomerPopupClick()}
            >
              <AddIcon className="material-icons" />
              <span>Upload Customer</span>
            </Button>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <SupervisedUserCircleIcon className="material-icons" />
              </div>
              <div className="cardHeaderRight">
                <h3>Customer List</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Customer Code</th>
                  </tr>
                </thead>
                <tbody>
                  {customerList && customerList.length > 0
                    ? getCustomerList()
                    : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>

      {/* {addCustomerPopup ? (
        <CreateCustomerPopup
          type={popupType}
          customer={editingCustomer}
          refreshCustomerList={(data) => refreshCustomerList()}
          onClose={() => onPopupClose()}
        />
      ) : null} */}
      {uploadCustomerPopup ? (
        <UploadCustomerPopup
          refreshCustomerList={() => refreshCustomerList()}
          onClose={() => onUploadCustomerPopupClose()}
        />
      ) : null}
      {/* {deleteTaxPopup ? (
        <DeletePopup
          element={deletingTax}
          onClose={() => onDeleteTaxPopupClose()}
          delete={handleDeleteTax}
          header="tax"
        />
      ) : null} */}
    </Wrapper>
  );
};

export default MerchantCustomerListPage;
