import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const GasPliceItem = (props) => {
    const { gasPlice } = props;

    return(
        <ListItem>
          <ListItemText primary="標準GAS価格" secondary={gasPlice+" Gwei"} />
        </ListItem>
    );
}

export default GasPliceItem;