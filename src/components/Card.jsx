import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';


const CardNew = (props) => {
    
    return (
        <StylesProvider injectFirst>
            <Card>
                {/* <p>{props.uniqueId}</p> */}
                <p>{props.log}</p>
            </Card>
        </StylesProvider>
    )
}

export default CardNew;