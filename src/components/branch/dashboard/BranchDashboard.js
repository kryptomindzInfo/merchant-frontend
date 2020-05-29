import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import BranchHistoryCard from './BranchHistoryCard';
import BranchSideBar from '../../shared/sidebars/BranchSideBar';
import Container from '../../shared/Container';
import Row from '../../shared/Row';
import Main from '../../shared/Main';
import CashInHandCard from '../../shared/CashInHandCard';
import TotalCashierCard from '../../shared/TotalCashierCard';
import BranchHeader from '../../shared/headers/branch/BranchHeader';

const BranchDashboard = (props) => {
  const { match } = props;
  const { branchName } = match.params;

  return (
    <Fragment>
      <Helmet>
        <title>{`${branchName} | Dashboard`}</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <BranchHeader branchName={branchName} />
      <Container verticalMargin>
        <BranchSideBar />
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
