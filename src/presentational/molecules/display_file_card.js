import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const displayFileCard = props => {
    const { uploadedFiles } = props;

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
              <Card>
                <CardContent>
                  <Typography variant="headline">
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

export default displayFileCard;

