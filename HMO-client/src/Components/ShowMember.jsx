import React, { useState, useEffect } from 'react';
import ProducerMobx from '../mobx/ProducerMobx';
import VaccinationMobx from '../mobx/VaccinationMobx';
import MemberMobx from '../mobx/MemberMobx';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditMember from './EditMember'
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const ShowMember = ({ }) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openAddVec, setOpenAddVec] = useState(false)
    const [date, setDate] = useState("");
    const [producer, setProducer] = useState(0);
    const [data, setData] = useState([]);
    const [dataMembers, setDataMembers] = useState([]);
    const location = useLocation();
    const { memberId } = location.state;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const dataProducer = await ProducerMobx.getProducers();
            setData(dataProducer);
            const members = await MemberMobx.getMember();
            setDataMembers(members);
        };
        fetchData();
    }, []);

    const member = dataMembers.filter(m => m.id == memberId)
    const handleClickOpen = () => {
        setOpenEdit(true);
    };
    const closeEdit = async () => {
        setOpenEdit(false);
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for a short delay
        window.location.reload();//Reloud the page to save the changes
    }
    
    function createData(index, date, producer) {
        return { index, date, producer };//create a line in the table that show a vaccination
    }

    const rows = member[0] ? member[0].vaccinations.map((v, index) => {
        return createData(index + 1, v.date, v.producer.name);//Create a table for vaccination
    }) : [];
    

    const AddVaccination = async () => {//Function to add a new vaccination
        if(member[0].vaccinations.length == 4)//Treatment of limiting the number of vaccinations to 4
            alert("This member has already had 4 vaccinations")
        else
        {const vac = {//Creating the object to send to the server depending on the server
            producerId: producer,
            date: date,
            memberId: memberId,
        }
        VaccinationMobx.addVaccination(vac);
        setOpenAddVec(false);
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for a short delay
        window.location.reload();//Reloud the page to save the changes
    }
    }
    //Opening the fields to add a vaccine
    const addVac = () => {
        setOpenAddVec(true);
    };

    return (
        <>
            {member && member.length > 0 ? (

                <>
                    <DialogTitle
                        sx={{
                            m: 0,
                            p: 2,
                            width: '30vw',
                            maxWidth: 'none'
                        }}
                        id="customized-dialog-title"
                    >
                        {member[0].name}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={() => { navigate('/') }}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent
                        dividers
                        sx={{
                            width: '30vw',
                            maxWidth: 'none'
                        }}
                    >
                        <Typography gutterBottom>
                            Address: {member[0].city} {member[0].street} {member[0].houseNumber}
                        </Typography>
                        <Typography gutterBottom>
                            Date of birth: {member[0].dateOfBirth}
                        </Typography>
                        <Typography gutterBottom>
                            Contact Information: <br />
                            Phone: {member[0].phone}<br />
                            Mobile Phone: {member[0].mobilePhone}
                        </Typography>
                    </DialogContent>
                    <DialogContent>
                        <Typography gutterBottom>
                            Start ill: {member[0].startOfIll}<br />
                            End ill: {member[0].endOfIll}
                        </Typography>
                    </DialogContent>
                    <DialogContent>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left">Date</TableCell>
                                        <TableCell align="left">Producer</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows && rows.map((row,index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">{row.index}</TableCell>
                                            <TableCell align="left">{row.date}</TableCell>
                                            <TableCell align="left">{row.producer}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            width: '30vw',
                            maxWidth: 'none'
                        }}
                    >
                        {<Button variant="outlined" onClick={() => addVac()}>Add Vaccine</Button>}
                        <IconButton aria-label="edit" size="large" onClick={handleClickOpen}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </DialogActions>
                    <EditMember open={openEdit} member={member[0]} handleCloseEdit={closeEdit}></EditMember>
                    {openAddVec && <DialogActions>
                        <TextField label="Date" variant="filled" onChange={(e) => setDate(e.target.value)} required />
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Producer</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                onChange={(e) => setProducer(e.target.value)}
                                required
                            >
                                <MenuItem value="">
                                    <em>null</em>
                                </MenuItem>
                                {data.map((producer,index) => (
                                    <MenuItem key={index} value={producer.id}>{producer.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <IconButton aria-label="delete" size="large" onClick={AddVaccination}>
                            <AddIcon />
                        </IconButton>
                    </DialogActions>}
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );

}
export default ShowMember;
