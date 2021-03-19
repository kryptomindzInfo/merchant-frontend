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
import CreateTaxPopup from './CreateTaxPopup';
import Card from '../../shared/Card';
import DeletePopup from '../../shared/DeletePopup';
import { fetchTaxList, deleteTax } from '../api/MerchantAPI';

const MerchantTaxListPage = () => {
  const [addTaxPopup, setAddTaxPopup] = React.useState(false);
  const [taxList, setTaxList] = React.useState([]);
  const id = JSON.parse(localStorage.getItem('merchantLogged')).details._id;
  const [copyTaxList, setCopyTaxList] = React.useState([])
  const [popupType, setPopupType] = React.useState('new');
  const [editingTax, setEditingTax] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [deleteTaxPopup, setDeleteTaxPopup] = React.useState(false);
  const [deletingTax, setDeletingTax] = React.useState({});

  const handleTaxPopupClick = (type, tax) => {
    setEditingTax(tax);
    setPopupType(type);
    setAddTaxPopup(true);
  };

  const onPopupClose = () => {
    setAddTaxPopup(false);
  };

  const refreshTaxList = async () => {
    setLoading(true);
    fetchTaxList(id).then((data) => {
      setTaxList(data.list);
      setCopyTaxList(data.list)
      setLoading(data.loading);
    });
  };

  const handleDeleteTaxPopupClick = (offering) => {
    setDeletingTax(offering);
    setDeleteTaxPopup(true);
  };

  const onDeleteTaxPopupClose = () => {
    setDeleteTaxPopup(false);
  };

  const handleDeleteTax = (tax) => {
    deleteTax(tax._id).then(() => {
      refreshTaxList();
      setDeleteTaxPopup(false);
    });
  };

  useEffect(() => {
    refreshTaxList();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }


  const searchlistfunction = (value) => {



    const newfilterdata = copyTaxList.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );


    setTaxList(newfilterdata)


  }

  const getTaxList = () => {
    return taxList.map((tax) => {
      return (
        <tr key={tax._id}>
          <td className="tac">{tax.name}</td>
          <td className="tac">{tax.code}</td>
          <td className="tac bold">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <td className="tac">{tax.value}</td>
              <span className="absoluteMiddleRight primary popMenuTrigger">
                <i className="material-icons ">more_vert</i>
                <div className="popMenu">
                  <span onClick={() => handleTaxPopupClick('update', tax)}>
                    Edit
                  </span>
                  <span onClick={() => handleDeleteTaxPopupClick(tax)}>
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
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Taxes</title>
      </Helmet>
      <MerchantHeader active="taxes" />
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
              <input type="text" placeholder="Search Taxes" onChange={(e) => {
                searchlistfunction(e.target.value)
              }} />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handleTaxPopupClick('new', {})}
            >
              <AddIcon className="material-icons" />
              <span>Create Tax</span>
            </Button>
          </ActionBar>
          <Card bigPadding>
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <SupervisedUserCircleIcon className="material-icons" />
              </div>
              <div className="cardHeaderRight">
                <h3>Tax List</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {taxList && taxList.length > 0 ? getTaxList() : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addTaxPopup ? (
        <CreateTaxPopup
          type={popupType}
          tax={editingTax}
          refreshTaxList={(data) => refreshTaxList()}
          onClose={() => onPopupClose()}
        />
      ) : null}
      {deleteTaxPopup ? (
        <DeletePopup
          element={deletingTax}
          onClose={() => onDeleteTaxPopupClose()}
          delete={handleDeleteTax}
          header="tax"
        />
      ) : null}
    </Wrapper>
  );
};

export default MerchantTaxListPage;
