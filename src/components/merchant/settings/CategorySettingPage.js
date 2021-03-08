import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { date } from 'yup';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../shared/Wrapper';
import ActionBar from '../../shared/ActionBar';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import SettingSideBar from './SettingSidebar';
import Table from '../../shared/Table';
import CreateCategoryPopup from './CreateCategoryPopup';
import DefaultBillPeriodPopup from './DefaultPeriodPopup';
import { getCategories } from '../api/MerchantAPI';

const CategorySettingPage = (props) => {
  const [addCategoryPopup, setAddCategoryPopup] = React.useState(false);
  const [categoryList, setCategoryList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const handleCategoryPopupClick = () => {
    setAddCategoryPopup(true);
  };

  const onPopupClose = () => {
    setAddCategoryPopup(false);
  };

  const refreshCategoryList = async () => {
    setLoading(true);
    const data = await getCategories();
      setCategoryList(data.list);
      setLoading(data.loading);
  };

  const getCategoryList = () => {
    return categoryList.map((category) => {
      return (
        <tr key={category._id}>
          <td className="tac">{category.name}</td>
          <td className="tac">{category.code}</td>
          <td className="tac">{category.description}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    refreshCategoryList();
  }, []);


  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Period Setting</title>
      </Helmet>
      <MerchantHeader page="info" goto="/merchant/dashboard" />
      <Container verticalMargin>
        <SettingSideBar active="CategorySettings" />
        <Main big>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">
                <SearchIcon />
              </i>
              <input type="text" placeholder="Search Bill Periods"  />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handleCategoryPopupClick()}
            >
              <AddIcon className="material-icons" />
              <span>Add Category</span>
            </Button>
          </ActionBar>
          <Card bigPadding topMargin="55px">
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Categories</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryList && categoryList.length > 0
                    ? getCategoryList()
                    : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addCategoryPopup ? (
        <CreateCategoryPopup
          refreshcategorylist={(data) => refreshCategoryList(data)}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
};
export default CategorySettingPage;
