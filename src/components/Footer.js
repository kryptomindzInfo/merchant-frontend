import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import locale from 'yup/lib/locale';
import styled from 'styled-components';



const FrontLeftWrap = styled.section`
    background-image: ${(props) => props.theme.vGradient};
    position: fixed,
    left: 0,
    bottom: 0,
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    color: #fff;
    align-items: center;
    justify-content: center;
  `;

const Footer = () => {
  const name  = JSON.parse(localStorage.getItem(`cashierLogged`)).bank ? JSON.parse(localStorage.getItem(`cashierLogged`)).bank.name : '';
    return (
          <FrontLeftWrap>
        <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Typography style={{ fontWeight: '400', fontSize: '15px' }}>
        Powered by Digital business ecosystem. Associated with {name}.
        </Typography>
      </Grid>
    </FrontLeftWrap>
    );
};

export default Footer;