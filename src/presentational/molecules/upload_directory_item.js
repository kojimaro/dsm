import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import UploadProgressBtn from '../atoms/upload_progress_btn.js';

const styles = theme => ({
    input: {
        display: 'none'
    }
});

const UploadDirectoryItem = (props) => {
    const {classes, readDirectory, uploadState} = props;
    return(
        <React.Fragment>
        <ListItem>
            <input
                className={classes.input}
                id="outlined-button-directory"
                webkitdirectory="true"
                type="file"
                onChange={readDirectory}
                disabled={uploadState.formDisabled}
                onClick={(event)=>{event.target.value=null}}
            />
            <label htmlFor="outlined-button-directory">
                <UploadProgressBtn uploadState={uploadState} />
            </label>
        </ListItem>
        <ListItem style={{display: uploadState.failed ? 'block':'none'}}>
          <Typography variant="subheading" color="secondary">
            アップロードに失敗しました。
          </Typography>
        </ListItem>
        </React.Fragment>
    );
}

export default withStyles(styles)(UploadDirectoryItem);
