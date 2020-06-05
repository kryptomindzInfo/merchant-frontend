import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import BranchHistoryCard from './BranchHistoryCard';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import CashInHandCard from '../../shared/CashInHandCard';
import TotalCashierCard from '../../shared/TotalCashierCard';
import BranchHeader from '../../shared/headers/branch/BranchHeader';

const BranchDashboard = (props) => {
  const { match } = props;
  const { name } = match.params;

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard | Branch </title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <BranchHeader active="dashboard" />
      <Container verticalMargin>
        <Main fullWidth>
          <Row textAlign="start" justify="start">
            <CashInHandCard />
            <TotalCashierCard />
          </Row>
          <BranchHistoryCard />
        </Main>
      </Container>
    </Fragment>
  );
};

export default BranchDashboard;
