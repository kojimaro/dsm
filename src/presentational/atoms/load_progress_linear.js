import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
    margin: '20%'
  }
};

const LoadProgressLinear = props => {
    const { classes, isLoading } = props;
    return (
        <div className={classes.root} style={{display: isLoading ? 'block':'none'}}>
          <LinearProgress color="secondary"/>
        </div>
    );
}

export default withStyles(styles)(LoadProgressLinear);