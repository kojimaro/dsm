import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import UploadProgressBtn from '../atoms/upload_progress_btn.js';

const styles = theme => ({
    input: {
        display: 'none'
    }
});

const UploadDirectoryItem = (props) => {
    const {classes, readDirectory, uploadState} = props;
    return(
        <ListItem>
            <input
                className={classes.input}
                id="outlined-button-directory"
                webkitdirectory="true"
                type="file"
                onChange={readDirectory}
                disabled={uploadState.formDisabled}
            />
            <label htmlFor="outlined-button-directory">
                <UploadProgressBtn uploadState={uploadState} />
            </label>
        </ListItem>
    );
}

export default withStyles(styles)(UploadDirectoryItem);
