import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, TextField, Popover } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import PublishIcon from '@mui/icons-material/Publish';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Container from '@mui/material/Container';

export default function MoreVertMenu({ anchorEl, handleClose, handleDelete, handleEdit, handleShare, handlePublish, handleRename }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [anchor, setAnchor] = React.useState(null);

    const handleClickRename = (event) => {
        handleClose();
        setModalOpen(true);
        setAnchor(event.currentTarget);
    };
    
    const handleSubmit = () => {
        handleRename(newName);
        setModalOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    return (
        <Container>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>       
                <MenuItem onClick={handleEdit}><EditIcon /> Editieren</MenuItem>
                <MenuItem onClick={handleClickRename}><DriveFileRenameOutlineIcon />Umbenennen</MenuItem>
                <MenuItem onClick={handleShare}><ShareIcon />Teilen</MenuItem>
                <MenuItem onClick={handlePublish}><PublishIcon />Veröffentlichen</MenuItem>
                <MenuItem onClick={handleDelete}> <DeleteIcon />Löschen</MenuItem>
            </Menu>
            <Popover
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                anchorEl={anchor}
                anchorReference="anchorEl"
                anchorPosition={{
                    top: anchor ? anchor.offsetTop + anchor.offsetHeight : 0,
                    left: anchor ? anchor.offsetLeft : 0,
                }}
                BackdropProps={{
                    style: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}>
                <Box p={2}>
                    <TextField
                        label="Neuer Kursname"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)} />
                    <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleSubmit} onKeyDown={handleKeyDown}>OK</Button>
                        <Button onClick={() => setModalOpen(false)}>Abbrechen</Button>
                    </Box>
                </Box>
            </Popover>
        </Container>
    );
}