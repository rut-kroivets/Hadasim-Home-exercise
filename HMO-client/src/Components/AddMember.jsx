import * as React from 'react';
import { useForm } from 'react-hook-form';
import MemberMobx from '../mobx/MemberMobx';
import { observer } from 'mobx-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddMember = observer(({ open, handleClose }) => {

    const { register, handleSubmit, formState: { errors },reset} = useForm();    
    function handleSubmitForm(form) {//Function to add a new member
        MemberMobx.addMember(form);//Calld to mobx of member 
        reset();
        handleClose();//Close the dialog
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}

            >
                <Paper onSubmit={handleSubmit(handleSubmitForm)} component="form">
                    <DialogTitle>Add member:</DialogTitle>
                    <IconButton
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent >
                        <TextField
                            {...register('identity', {
                                minLength: { value: 9, message: "Id must be at 9 numbers" },
                                maxLength: { value: 9, message: "Id must be at 9 numbers" }
                            })}
                            id="outlined-required"
                            label="Id"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            margin="dense"
                            required
                        error={!!errors.identity}
                        helperText={errors.identity ? errors.identity.message : ""}
                        />
                        <TextField
                            {...register('name', {
                                minLength: { value: 6, message: "Name must be at least 6 characters" },
                                maxLength: { value: 20, message: "Name must be at most 20 characters" }
                            })}
                            id="standard-password-input"
                            label="Name"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            margin="dense"
                            required
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                        />
                        <TextField
                            {...register('dateOfBirth', {
                                pattern: {
                                    value: /^\d{2}\.\d{2}\.\d{4}$/,
                                    message: 'Please enter the date in the format DD.MM.YYYY'
                                }
                            })}
                            id="standard-password-input"
                            label="Date of birth"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            margin="dense"
                            required
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                        /><br />
                        <TextField
                            {...register('city', {
                                minLength: { value: 2, message: "City name must be at least 2 characters" },
                                maxLength: { value: 15, message: "City name must be at most 30 characters" }
                            })}
                            id="standard-password-input"
                            label="City"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            margin="dense"
                            required
                        />
                        <TextField
                            {...register('street', {
                                minLength: { value: 2, message: "Street name must be at least 2 characters" },
                                maxLength: { value: 15, message: "Street name must be at most 30 characters" }
                            })}
                            id="standard-password-input"
                            label="Street"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            margin="dense"
                            required
                        />
                        <TextField
                            {...register('houseNumber', {
                                minLength: { value: 1, message: 'House number must be at least 1 digit long' },
                                maxLength: { value: 3, message: 'House number cannot be longer than 3 digits' }
                            })}
                            id="standard-password-input"
                            label="House Number"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            margin="dense"
                            required
                        error={!!errors.houseNumber}
                        helperText={errors.houseNumber ? errors.houseNumber.message : ''}
                        />
                        <br />
                        <TextField
                            {...register('phone', {
                                minLength: {value: 9,message: 'Phone number must be exactly 9 digits long'},
                                maxLength: {value: 9,message: 'Phone number must be exactly 9 digits long'},
                                pattern: {value: /^\d+$/,message: 'Phone number must contain only digits'}
                            })}
                            id="standard-password-input"
                            label="Phone"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            margin="dense"
                            required
                            error={!!errors.phone}
                            helperText={errors.phone ? errors.phone.message : ''}
                        />
                        <TextField
                            {...register('mobilePhone', {
                                minLength: {value: 10,message: 'Mobile Phone number must be exactly 9 digits long'},
                                maxLength: {value: 10,message: 'Mobile Phone number must be exactly 9 digits long'},
                                pattern: {value: /^\d+$/,message: 'Mobile Phone number must contain only digits'}
                            })}
                            id="standard-password-input"
                            label="MobilePhone"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            margin="dense"
                            required
                            error={!!errors.mobilePhone}
                            helperText={errors.mobilePhone ? errors.mobilePhone.message : ''}
                        /><br />
                        <TextField
                            {...register('startOfIll', {
                                pattern: {
                                    value: /^\d{2}\.\d{2}\.\d{4}$/,
                                    message: 'Please enter the date in the format DD.MM.YYYY'
                                }
                            })}
                            id="standard-password-input"
                            label="start of ill"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            margin="dense"
                            error={!!errors.startOfIll}
                            helperText={errors.startOfIll ? errors.startOfIll.message : ''}
                        />
                        <TextField
                            {...register('endOfIll', {
                                pattern: {
                                    value: /^\d{2}\.\d{2}\.\d{4}$/,
                                    message: 'Please enter the date in the format DD.MM.YYYY'
                                }
                            })}
                            id="standard-password-input"
                            label="end of ill"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            margin="dense"
                            error={!!errors.endOfIll}
                            helperText={errors.endOfIll ? errors.endOfIll.message : ''}
                        />
                        <DialogActions>
                            <Button type="submit" >Add</Button>
                        </DialogActions>


                    </DialogContent>
                </Paper>


            </Dialog>
        </React.Fragment>
    );
});

export default AddMember;
