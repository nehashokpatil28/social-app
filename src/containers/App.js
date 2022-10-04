import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import axios from 'axios'
import StudentListTable from './StudentListTable';
import StudentModal from './StudentModal';
import FamilyMembersModal from './FamilyMembersModal';
import Dropdown from '../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { initStudentRecord, setSelectedStudent, setStudentList, setStudentRecord } from '../redux/action/studentModalActions';
import { initFamilyRecord, setFamilyRecord } from '../redux/action/familyModalActions';

function App() {
  const dispatch = useDispatch()
  const [role, setRole] = useState('admin')
  const [addStudentModal, shouldOpenStudentModal] = useState(false)
  const [addStudentDetailsModal, shouldOpenStudentDetailsModal] = useState(false)
  const [nationalities, setNationalities] = useState([])
  const [studentId, setStudentId] = useState('')

  const studentList = useSelector(state => state?.studentList)
  const familyList = useSelector(state => state?.familyList)
  const studentRecord = useSelector((state) => state?.studentRecord)

  const handleRoleChange = (e) => {
    setRole(e?.target?.value)
  }

  useEffect(() => {
    axios.get("http://localhost:8088/api/Nationalities").then(res => {
      setNationalities(res?.data)
    }).catch(err => {
      console.log("failed to get nationalities data ...!")
    })

    axios.get('http://localhost:8088/api/Students').then(res => {
      res.data && dispatch(setStudentList([...res.data]))
    }).catch(err => {
      console.log("failed to get student data ...!")
    })
  }, [])

  const handleOpen = () => shouldOpenStudentModal(true)

  const onRowClick = (id) => {
    const selectedStudentRecord = studentList.find(item=>item.ID===id)
    dispatch(setSelectedStudent(selectedStudentRecord))
    axios.get(`http://localhost:8088/api/Students/${id}/FamilyMembers`)
      .then(res => {

        let payloadData = []
        if (res?.data) {
          payloadData = [...familyList, ...res?.data?.filter(item => familyList.some(i => {
            if ((i?.ID || familyList.length === 1) && i.ID !== item.ID) {
              return true
            } else {
              return false
            }
          }))]
          dispatch(setFamilyRecord(payloadData))
        }

        setStudentId(id)
        shouldOpenStudentDetailsModal(true)
      }).catch(err => { console.log("error in retriving faamily", err) })
  }


  const saveStudentData = (data) => {
    shouldOpenStudentModal(false)
    axios.post("http://localhost:8088/api/Students", {
      ...data
    }).then(res => {
      res.data && dispatch(setStudentList([...studentList, { ...res.data }]))

      // res.data && dispatch({ type: "SET_STUDENT_LIST", payload: [...studentList, { ...res.data }] })
      // res.data && setStudentList(prev => [...prev, { ...res.data }])
    }).catch(err => console.log("error while saving student record"))
    dispatch(initStudentRecord())

  }

  const setFamilyDetails = (e, key, customValue) => {
    const familyData = [...familyList]
    familyData[key][e?.target?.name] = customValue ? customValue : e?.target?.value
    dispatch(setFamilyRecord(familyData))
  }
  const getNationalityValue = (nationality) => {
    if (typeof nationality === 'object' && nationality?.ID) {
      return nationality?.ID
    } else {
      return nationality
    }
  }
  const saveFamilyDetails = (id) => {
    setStudentId(id)
    for (let details in familyList) {
      const family = familyList?.[details]
      const nationality = getNationalityValue(family?.nationality)
      if (family) {
        const familyId = family?.ID || ''
        if (familyId && role !== 'admin') {
          axios.put(`http://localhost:8088/api/FamilyMembers/${familyId}`, { ...family })
            .then(res => {
              console.log("record saved")
              axios.put(`http://localhost:8088/api/FamilyMembers/${res?.data?.ID}/Nationality/${nationality}`)
                .then(response => {
                  console.log("family member's nationoality saved")
                }).catch(error => {
                  console.log("error saving family member's nationoality")
                })
            })
            .catch(err => { console.log("error occured") })


        } else if (!familyId && (family.firstName || family?.nationality?.ID || family.relationship)) {
          axios.post(`http://localhost:8088/api/Students/${studentId}/FamilyMembers`, { ...family })
            .then(res => {
              axios.put(`http://localhost:8088/api/FamilyMembers/${res?.data?.ID}/Nationality/${nationality}`)
                .then(response => {
                  console.log("family member's nationoality saved")
                }).catch(error => {
                  console.log("error saving family member's nationoality")
                })
            })
            .catch(err => { console.log("error occured") })
        }
      }
    }
    shouldOpenStudentDetailsModal(false)
    dispatch(initStudentRecord())
    setStudentId('')
    dispatch(initFamilyRecord())

  }
  const addNewFamilyMember = () => {
    dispatch(setFamilyRecord([...familyList, {
      firstName: '',
      nationality: '',
      relationship: ''
    }]))
  }
  console.log("familyList ", familyList)

  const onDeleteClick = (id) => {
    id && axios.delete(`http://localhost:8088/api/FamilyMembers/${id}`).then(res => {
      res.status === 200 &&
        dispatch(setFamilyRecord(familyList?.filter(item => item?.ID !== id)))

      // setFamilyList(familyList.filter(item => item.ID !== id))
      console.log('family member deleted', res)
    }).catch(err => console.log("error deleting family memebr"))
  }

  const updateStudentData = (e) => {
    dispatch(setStudentRecord({ [e?.target?.name]: e?.target?.value })
    )
  }

  return (
    <Grid container sx={{ padding: '2rem' }} spacing={5} className="App">
      <Grid container item>
        <Grid item sm={6} md={6} xs={6} container>
          <Button variant="outlined" onClick={handleOpen} justifyContent="flex-end">Add New Student</Button>
        </Grid>
        <Grid item sm={6} md={6} xs={6} container justifyContent="flex-end">

          <Dropdown
            label={'User Role'}
            emptyOption={false}
            value={role}
            name={'userRole'}
            id={`user-role`}
            options={['admin', 'registrar']}
            labelId={`nationality_label`}
            onChange={handleRoleChange}
          />
        </Grid>




      </Grid>
      <Grid container item >
        <StudentListTable onRowClick={onRowClick} rows={studentList} />
      </Grid>
      <Grid container item >
        <StudentModal updateStudentData={updateStudentData} saveStudentData={saveStudentData} nationalities={nationalities} addStudentModal={addStudentModal} handleClose={() => {
          shouldOpenStudentModal(false)
          setStudentId('')
          dispatch(initStudentRecord)
          studentRecord = { studentRecord }
        }} />
      </Grid>
      <Grid container item >
        <FamilyMembersModal
          role={role}
          addNewFamilyMember={addNewFamilyMember}
          nationalities={nationalities}
          addStudentDetailsModal={addStudentDetailsModal}
          familyList={familyList}
          setFamilyDetails={setFamilyDetails}
          studentId={studentId}
          onDeleteClick={onDeleteClick}
          studentRecord={studentRecord}
          handleClose={(e, key) => {
            setStudentId('')
            shouldOpenStudentDetailsModal(false)
            dispatch(initFamilyRecord())
            dispatch(initStudentRecord())
          }}
          saveFamilyDetails={saveFamilyDetails}
        />
      </Grid>
    </Grid>

  );
}

export default App;
