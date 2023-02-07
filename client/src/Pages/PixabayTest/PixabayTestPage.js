import React from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


function PixabayTestPage() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Pixabay</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
            </Modal>
        </div>
    );
}



export default PixabayTestPage;