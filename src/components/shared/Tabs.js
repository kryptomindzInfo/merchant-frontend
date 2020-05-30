import { Tabs as Tab, withStyles } from '@material-ui/core';
import React from 'react';

const Tabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#417505',
    },
  },
})((props) => <Tab {...props} TabIndicatorProps={{ children: <div /> }} />);

export default Tabs;
