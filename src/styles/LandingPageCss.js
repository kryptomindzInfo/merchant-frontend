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
    paddingRight: '10%',
    overflow: 'hidden',
  },
  textField: {
    border: `1px solid ${theme.primary}`,
  },
  signInButton: {
    backgroundColor: theme.primary,
    marginTop: '7%',
    padding: '0px',
    fontSize: '24px',
    color: '#fff',
    width: '70%',
    '&:hover': {
      background: '#1c3302',
    },
  },
}));

export default styles;
