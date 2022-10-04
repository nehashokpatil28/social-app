import React, { useMemo } from 'react';
import { Button, Grid, TextField, Paper } from '@mui/material';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import Close from '@mui/icons-material/Close';
import Dropdown from '../components/Dropdown';
import StudentListTable from './StudentListTable';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 470,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
    overflow: 'auto'
};

export default function FamilyMembersModal(props) {


    const { saveFamilyDetails, handleClose, nationalities = [], setFamilyDetails, studentRecord, onDeleteClick, role, familyList, addStudentDetailsModal, addNewFamilyMember } = props
    console.log("student record", studentRecord)
    const studentId = studentRecord?.ID
    const renderNationalityDropDown = useMemo(() => {
        return (nationality = '', cb, key = 0, disabled) => {
            if (typeof nationality === 'object') {
                nationality = nationality.ID
            }
            return (
                <>
                    <Dropdown
                        label={'Nationality'}
                        disabled={disabled}
                        value={nationality}
                        name={'nationality'}
                        id={`nationality-${key}`}
                        options={nationalities}
                        labelId={`relationship-${key}`}
                        onChange={(e) => {
                            cb && cb(e, key)
                        }}
                        optionValueKey={'ID'}
                        optionLabelKey={'Title'}
                        emptyOption={false}

                    />
                </>)
        }
    }, [nationalities?.length])

    const shouldDisabled = (item) => {
        if (role === 'admin') {
            return item.ID ? true : false
        } else if (role === 'registrar') {
            return false
        }
    }
    return (

        <Grid spacing={2} direction="row"
            container>
            <Modal
                open={addStudentDetailsModal}
                onClose={() => {

                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper sx={style} >
                    <Grid className='modal-header'
                        item
                        spacing={2}
                        container>
                        <Grid item sm={6} md={6} xs={6}>
                            <Button variant='outlined' onClick={() => saveFamilyDetails(studentId)} style={{ textTransform: 'none' }}>Submit Details</Button>
                            <Button variant='outlined' onClick={addNewFamilyMember} style={{ textTransform: 'none' }}>Add Family Member</Button>
                        </Grid>
                        <Grid item sm={6} md={6} xs={6} container justifyContent="flex-end">
                            <Close className='close-button' onClick={() => handleClose()} />
                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container item>
                        <StudentListTable rows={[studentRecord]} />
                    </Grid>
                    <Grid className='family-lists-wrapper' sx={{ padding: '2rem 0rem 2rem 2rem' }} item container spacing={2}>
                        {
                            familyList?.map((item, key) => {
                                const disabled = shouldDisabled(item)
                                return (
                                    <>
                                        <Grid item sm={3} md={3} xs={3} key={key}>
                                            <TextField disabled={disabled} id="firstName" name="firstName" label="First Name" onChange={(e) => setFamilyDetails(e, key)} value={item.firstName} variant="outlined" />
                                        </Grid>
                                        <Grid item sm={3} md={3} xs={3} key={key}>
                                            <Dropdown
                                                label={'Relationship'}
                                                disabled={disabled}
                                                value={item?.relationship || ''}
                                                name={'relationship'}
                                                id={`relationship-${key}`}
                                                options={["Parent", "Sibling", "Spouse"]}
                                                labelId={`relationship-${key}`}
                                                onChange={(e) => setFamilyDetails(e, key)}
                                                emptyOption={false}
                                            />
                                        </Grid>
                                        <Grid item sm={3} md={3} xs={3} key={key}>
                                            {renderNationalityDropDown(item.nationality, setFamilyDetails, key, disabled)}

                                        </Grid>
                                        <Grid item sm={2} md={2} xs={2} key={key}>
                                            <Button variant='outlined' onClick={() => onDeleteClick(item.ID)} disabled={Boolean(!item.ID || role === 'admin')}>Delete<DeleteIcon /></Button>
                                        </Grid>

                                    </>
                                )
                            })}
                    </Grid>
                </Paper>
            </Modal>
        </Grid>
    );
}