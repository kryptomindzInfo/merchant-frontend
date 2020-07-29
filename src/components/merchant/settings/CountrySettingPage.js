import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
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
import CreateCountryPopup from './CreateCountryPopup';
import DefaultCountryPopup from './DefaultCountryPopup';
import { getCountryList } from '../api/MerchantAPI';

const CountrySettingPage = (props) => {
  const [addCountryPopup, setAddCountryPopup] = React.useState(false);
  const [countryList, setCountryList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [defaultCountry, setDefaultCountry] = React.useState({});
  const [defaultCountryPopup, setDefaultCountryPopup] = React.useState(false);

  const handleCountryPopupClick = () => {
    setAddCountryPopup(true);
  };

  const onPopupClose = () => {
    setAddCountryPopup(false);
  };

  const handleDefaultCountryPopupClick = () => {
    setDefaultCountryPopup(true);
  };

  const onDefaultCountryPopupClose = () => {
    setDefaultCountryPopup(false);
  };

  const refreshCountryList = async () => {
    setLoading(true);
    getCountryList().then((data) => {
      console.log(data);
      setCountryList(data.list);
      setDefaultCountry(data.default_country);
      setLoading(data.loading);
    });
  };

  const getCountry = () => {
    return countryList.map((country) => {
      return (
        <tr key={country._id}>
          <td className="tac">{country.name}</td>
          <td className="tac">{country.ccode}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    refreshCountryList();
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Country Setting</title>
      </Helmet>
      <MerchantHeader page="info" goto="/merchant/dashboard" />
      <Container verticalMargin>
        <SettingSideBar active="CountrySettings" />
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
              <input type="text" placeholder="Search Country" />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handleCountryPopupClick()}
            >
              <AddIcon className="material-icons" />
              <span>Add Country</span>
            </Button>
          </ActionBar>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div>
              {defaultCountry ? (
                <h3 style={{ margin: '6px' }}>
                  Default Country : {defaultCountry.name}
                </h3>
              ) : (
                <h3 style={{ margin: '6px' }}>Please set default country</h3>
              )}
            </div>
            <Button
              className="addBankButton"
              style={{ float: 'right' }}
              onClick={() => handleDefaultCountryPopupClick()}
            >
              <span>Set Default Country</span>
            </Button>
          </ActionBar>
          <Card bigPadding topMargin="55px">
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Country List</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Country code</th>
                  </tr>
                </thead>
                <tbody>
                  {countryList && countryList.length > 0 ? getCountry() : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addCountryPopup ? (
        <CreateCountryPopup
          refreshcountrylist={(data) => refreshCountryList(data)}
          onClose={() => onPopupClose()}
        />
      ) : null}
      {defaultCountryPopup ? (
        <DefaultCountryPopup
          countrylist={countryList}
          onClose={() => onDefaultCountryPopupClose()}
          refreshcountrylist={(data) => refreshCountryList(data)}
        />
      ) : null}
    </Wrapper>
  );
};
export default CountrySettingPage;
