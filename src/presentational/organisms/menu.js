import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import UploadDirectoryItem from '../molecules/upload_directory_item.js';
import Divider from '@material-ui/core/Divider';
import DisplayFileCard from '../molecules/display_file_card.js';
import GasPliceItem from '../atoms/gas_plice_item.js';
import DisclaimerItem from '../atoms/disclaimer_item.js';

const drawerWidth = 340;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        height: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    flex: {
        flexGrow: 1
    },
    drawerPaper: {
        width: drawerWidth,
        position: 'relative',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0,
        overflow: 'scroll'
    },
    toolbar: theme.mixins.toolbar
});

const Menu = (props) => {
    const {classes, readDirectory, uploadState, uploadedFiles, gasPlice} = props;
    return(
        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                D.S.M
              </Typography>
              <Button color="inherit" target="_blunk" href="https://github.com/kojimaro/dsm">
                使い方などはGitHubへ
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
            <div className={classes.toolbar} />
            <List>
              <GasPliceItem gasPlice={gasPlice} />
            </List>
            <Divider />
            <List>
              <UploadDirectoryItem readDirectory={readDirectory} uploadState={uploadState} />
            </List>
            <Divider />
            <List>
              <DisclaimerItem />
            </List>
         </Drawer>
         <main className={classes.content}>
            <div className={classes.toolbar} />
            <DisplayFileCard uploadedFiles={uploadedFiles}/>
         </main>
        </div>
    );
}

export default withStyles(styles)(Menu);