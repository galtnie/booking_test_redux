import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../css/CircularProgress.css'

const styles = theme => ({
  progress: {
    margin: theme.spacing(2),
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className='ciruclar-progress-container'>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);