import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../shared/Wrapper';
import MerchantHeader from '../../shared/headers/merchant/MerchantHeader';
import Container from '../../shared/Container';
import Main from '../../shared/Main';
import Button from '../../shared/Button';
import OfferingCard from './OfferingCard';
import Loader from '../../shared/Loader';

const MerchantOfferingListPage = () => {
  const [isLoading, setLoading] = React.useState(false);

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
          <OfferingCard refreshoffering={() => refreshPage()} />
        </Main>
      </Container>
    </Wrapper>
  );
};

export default MerchantOfferingListPage;
