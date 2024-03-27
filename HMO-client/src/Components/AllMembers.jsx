import { observer } from 'mobx-react-lite';
import MemberMobx from "../mobx/MemberMobx";
import * as React from 'react';
import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import AddMember from './AddMember';
import { useNavigate } from 'react-router-dom';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AllMembers = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {//Brought all the member data from the mobix that calls the server
        const fetchData = async () => {
            const dataMembers = await MemberMobx.getMember();
            setData(dataMembers);//Put the member data in data variables
        };
        fetchData();
    }, []);

    const handleClickOpen = (member) => {//A function that handles the request to view the member's data 
        setSelectedMember(member);
        navigate('/member', { state: { memberId: member.id } });//Routing at the root address of the component that displays the details
    };

    const handleClose = () => {
        setOpen(false);
    };

    function add() {//Opening the dialog to add a friend
        setOpenAdd(true);
    }
    //A function that handles a member deletion request by sending the member to the server's delete function
    const deleteMember = async (id) => {
        try {
            await MemberMobx.deleteMember(id);
            setData(data.filter(member => member.id !== id));
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };
    const handleCloseAddMember = () => {
        setOpenAdd(false);
    };

    return (
        <>
            <Button variant="contained" onClick={add}  sx={{ margin: '2rem' }}>Add Member</Button>
            <ListItem sx={{ bgcolor: "black", color: "white" }}>
                <ListItemText primary={"ID"} />
                <ListItemText primary={"Name"} />
            </ListItem>
            <List sx={{ width: '100vw', maxWidth: 900, bgcolor: 'background.paper' }}>
                {data.map((value) => {
                    return (
                        <ListItem key={value.id} disablePadding>
                            <ListItemButton role={undefined} onClick={() => handleClickOpen(value)} dense>
                                <ListItemText primary={value.identity} />
                                <ListItemText primary={value.name} />
                            </ListItemButton>
                            <IconButton aria-label="corona" size="large" onClick={() => deleteMember(value.id)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </ListItem>
                    );
                })}
            </List>
            <AddMember open={openAdd} handleClose={handleCloseAddMember}></AddMember>

        </>
    );
};

export default observer(AllMembers);
