import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  setupPageLeftSide: {
    background: theme.palette.vGradient,
    height: '100vh',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  setupPageRightSide: {
    marginTop: '5%',
    paddingLeft: '10%',
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20%',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '14%',
    },
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    marginBottom: '0.03375rem',
    width: '70%',
  },
  signInButton: {
    background: theme.palette.primary.main,
    marginTop: '7%',
    padding: '0px',
    fontSize: '24px',
    color: theme.palette.white,
    width: '70%',
    '&:hover': {
      background: theme.palette.primary.hover,
    },
  },
}));

export default styles;
