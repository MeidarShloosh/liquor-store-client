import React from 'react'
import {Dimmer, Loader} from "semantic-ui-react";

const Spinner= ({text})=>{
    return (
        <Dimmer  active>
            <Loader size='massive'>{text}</Loader>
        </Dimmer>
    );
};

Spinner.defaultProps ={
    text: 'Loading...'
};

export default Spinner;