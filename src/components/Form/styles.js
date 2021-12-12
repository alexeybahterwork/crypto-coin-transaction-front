import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  layout: {
    minHeight: 256,
  },
  paper: {
    minHeight: 256,
    padding: 10,
  },
  title: {
    marginBottom: 15,
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  center: {
    marginLeft: 'calc(50% - 20px)',
  },
});
