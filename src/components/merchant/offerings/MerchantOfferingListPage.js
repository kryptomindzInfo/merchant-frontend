import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import ActionBar from '../../shared/ActionBar';
import CreateOfferingPopup from './CreateOfferingPopup';
import OfferingCard from './OfferingCard';
import Loader from '../../shared/Loader';

const MerchantOfferingListPage = () => {
  const [product, setProduct] = useState([]);
  const [showProductPopup, setProductPopup] = useState(false);
  const [popupType, setPopupType] = React.useState('new');
  const [isLoading, setLoading] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState({});

  const handleProductPopupClick = (type, staffObj) => {
    setEditingProduct(staffObj);
    setPopupType(type);
    setProductPopup(true);
  };

  const onPopupClose = () => {
    setProductPopup(false);
  };

  const refreshPage = () => {
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    refreshPage();
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Merchant | Offering</title>
      </Helmet>
      <MerchantHeader active="offering" />
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
              <input type="text" placeholder="Search Offering" />
            </div>

            <Button className="addBankButton" flex>
              <i className="material-icons">add</i>
              <span>Add Offering</span>
            </Button>
          </ActionBar>
          <OfferingCard refreshoffering={() => refreshPage()} />
        </Main>
      </Container>
      {showProductPopup ? (
        <CreateOfferingPopup
          type={popupType}
          product={editingProduct}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
};

export default MerchantOfferingListPage;
