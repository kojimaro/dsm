import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ErrorDialog = (props) => {
    const { displayDialog } = props;

    return (
      <div>
        <Dialog
          open={displayDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"METAMASKのインストールが必要です！"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              「D.S.M」の利用にはChrome・Firefox・OperaいずれかのブラウザにMETAMASKをインストールする必要があります。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary"　href="https://metamask.io/" target="_blunk">
              METAMASK公式サイト
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default ErrorDialog;