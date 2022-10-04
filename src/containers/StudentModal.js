import React, { useState, useMemo } from 'react';
import { Button, Grid, TextField, Box } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close';
import Dropdown from '../components/Dropdown';
import { useSelector } from 'react-redux'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function StudentModal(props) {
    const studentRecord = useSelector((state) => state?.studentRecord)

    const { addStudentModal, handleClose, nationalities = [], saveStudentData, updateStudentData } = props



    const renderNationalityDropDown = useMemo(() => {
        return (nationality = '', cb, key = 0) => {
            return (<Dropdown
                label={'Nationality'}
                value={nationality}
                name={'nationality'}
                id={`student-nationalityId-${key}`}
                options={nationalities}
                labelId={`nationality_label-${key}`}
                onChange={(e) => {
                    cb && cb(e, key)
                }}
                optionValueKey={'ID'}
                optionLabelKey={'Title'}
                emptyOption={false}
            />
            )
        }
    }, [nationalities])

    return (
        <Grid container spacing={5}>
            <Modal
                open={addStudentModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid>
                        <Grid container>
                            <Grid item sm={6} md={6} xs={6}>
                                <Button variant='outlined' onClick={() => {
                                    saveStudentData(studentRecord)
                                }}>

                                    Submit Student Data
                                </Button>
                            </Grid>
                            <Grid item sm={6} md={6} xs={6} container justifyContent="flex-end">
                                <Close onClick={() => {
                                    handleClose(false)
                                }} />
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container item>
                            <TextField id="first_name"
                                value={studentRecord.firstName}
                                label="First Name" name="firstName" onChange={(e) => {
                                    updateStudentData(e)
                                }} variant="outlined" />
                            <TextField id="last_name" value={studentRecord?.lastName} label="Last Name" name="lastName" onChange={(e) => {
                                updateStudentData(e)
                            }} variant="outlined" />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Date of Birth"
                                    inputFormat="DD/MM/YYYY"
                                    name="dateOfBirth"
                                    value={studentRecord?.dateOfBirth}
                                    onChange={(newValue) => {
                                        updateStudentData({
                                            target: {
                                                value: newValue,
                                                name: "dateOfBirth"
                                            }
                                        })
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            {renderNationalityDropDown(studentRecord.nationality, (e) => {
                                updateStudentData(e)
                            })}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    );
}