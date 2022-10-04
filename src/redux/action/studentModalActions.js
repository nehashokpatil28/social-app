export const initStudentRecord = (action) => {
    return { type: 'INIT_STUDENT_RECORD_DATA' }
}

export const setStudentList = (action) => {
    return { type: "SET_STUDENT_LIST", payload: [...action] }
}

export const setStudentRecord = (action) => {
    return { type: "SET_STUDENT_RECORD", payload: action }
}

export const setSelectedStudent = (action) => {
    return {type:'SET_SELECTED_STUDENT_RECORD',payload:action}
}
export const getStudentRecord = (action) => {
    return{type:'GET_STUDENT_RECORD'}
}