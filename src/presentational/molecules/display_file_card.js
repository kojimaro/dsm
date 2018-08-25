import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  }
}

const displayFileCard = props => {
    const {classes, uploadedFiles} = props;

    const compare = (a, b) => {
        const idA = a.id;
        const idB = b.id;

        let comparison = 0;
        if (idA > idB) {
            comparison = 1;
        } else if (idA < idB) {
            comparison = -1;
        }
        return comparison * -1;
    }

    let card = [];

    uploadedFiles.sort(compare);
    uploadedFiles.map((file, index) => {
        card.push(
            <Grid item key={index} sm={12} md={12} lg={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    <FolderIcon /> Directory
                  </Typography>
                  <Typography variant="headline" component="h2">
                    {file.path}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography color="textSecondary">
                    公開URL:
                  </Typography>
                  <a target="_blank" href={"https://ipfs.io/ipfs/"+file.hash}>https://ipfs.io/ipfs/{file.hash}</a>
                </CardActions>
              </Card>
            </Grid>
        );
        return card;
    });

    return (
        <Grid container spacing={24}>
            {card}
        </Grid>
    );
}

export default withStyles(styles)(displayFileCard);

