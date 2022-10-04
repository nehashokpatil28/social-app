import { combineReducers } from 'redux'
import { studentRecordReducer, studentListReducer } from '../reducer/studentListReducer';
import { familyListReducer } from '../reducer/familyListReducer'

export default combineReducers({
    studentList: studentListReducer,
    studentRecord: studentRecordReducer,
    familyList: familyListReducer
})