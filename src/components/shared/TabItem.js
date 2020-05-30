import { Tab, withStyles } from '@material-ui/core';
import React from 'react';

const TabItem = withStyles((theme) => ({
  root: {
    margin: '1%',
    color: '#417505',
    textAlign: 'center',
    width: '50%',
    textTransform: 'none',
    fontSize: 18,
    outline: 0,
    fontWeight: theme.typography.fontWeightBold,
  },
  selected: {
    '&$selected': {
      outline: 'none',
      border: 'none',
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export default TabItem;
