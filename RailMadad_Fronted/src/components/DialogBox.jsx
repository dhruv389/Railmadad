import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen}>
                <span className=' text-white hover:underline '>FAQs</span>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                sx={{
                     fontFamily: 'Poppins',
                     maxHeight:'500px',
                     top:'4rem',
                }}
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2, paddingLeft: 4, backgroundColor: '#D1D1D1', fontSize: '1.8rem' }} >
                    <span>Frequently Asked Questions</span>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        
                        color: theme.palette.white,
                    })}
                >
                    {/* <CloseIcon /> */}
                </IconButton>
                <DialogContent dividers>
                   <div >
                   <Accordion >
                        <AccordionSummary
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <span className=' font-extrabold pr-2'>Que 1 : </span> Who can use the utsonmobile application?
                        </AccordionSummary>
                        <AccordionDetails>
                            <span className=' font-extrabold '>Ans :</span> The services are not available to persons under the age of 17 or to anyone previously suspended or removed from the services by Indian Railways. By accepting the Terms & Conditions or by otherwise using the Services or the Site, you represent that You are at least 17 years of age and have not been previously suspended or removed from the Services. You represent and warrant that you have the right, authority, and capacity to enter into this Agreement and to abide by all the terms and conditions of this Agreement. You shall not impersonate any person or entity, or falsely state or otherwise misrepresent identity, age or affiliation with any person or entity.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion >
                        <AccordionSummary
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <span className=' font-extrabold pr-2'>Que 2 : </span> How to download the utsonmobile application?,
                        </AccordionSummary>
                        <AccordionDetails>
                            <span className=' font-extrabold '>Ans :</span> The Android version of the application can be downloaded from Google Play Store. The Windows version of the application can be downloaded from the Windows Store and the iOS version can be downloaded from the Apple store. The application is free to download.
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion >
                        <AccordionSummary
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <span className=' font-extrabold pr-2'>Que 3 : </span> Where to do registration?
                        </AccordionSummary>
                        <AccordionDetails>
                            <span className=' font-extrabold '>Ans :</span> Registration can be done through mobile phone application or website (https=//www.utsonmobile.indianrail.gov.in). The passenger first will get registered by providing his/her mobile number, name, password, gender and date of birth. After successful registration, an SMS will be sent to the user with login-id and password and zero-balance R-Wallet will be created without any additional cost.
                        </AccordionDetails>
                    </Accordion>
                   </div>

                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}