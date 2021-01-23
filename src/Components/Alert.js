import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { MdClose } from 'react-icons/md'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const AlertComponent = ({ hideAlert }) => {
    const classes = useStyles();
    return (
        <div className={`${classes.root}  w-40 alertCustom`}>
            <Alert severity="success" style={{ width: 'fit-content' }}>
                <button className="close" onClick={() => hideAlert()}>
                    <MdClose />
                </button>
                <AlertTitle>Success</AlertTitle>
                Congrats — <strong>you win!</strong>
            </Alert>
        </div>
    );
}

export default AlertComponent
