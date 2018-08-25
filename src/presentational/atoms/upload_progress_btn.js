import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import FolderIcon from '@material-ui/icons/Folder';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        }
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
});

const UploadProgressBtn = (props) => {

    const {classes, uploadState} = props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: uploadState.success,
    });

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant="fab"
            color="primary"
            className={buttonClassname}
            component="span"
          >
            {uploadState.success ? <CheckIcon /> : <FolderIcon />}
          </Button>
          {uploadState.uploading && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={uploadState.formDisabled}
            component="span"
          >
            フォルダのアップロード
          </Button>
          {uploadState.uploading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </div>
    );
}
export default withStyles(styles)(UploadProgressBtn);
