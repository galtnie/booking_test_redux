import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {CircularProgressContainer} from '../styles'
import styles from '../styles/CircularProgressMUIstyles'

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <CircularProgressContainer>
      <CircularProgress className={classes.progress} />
    </CircularProgressContainer>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);