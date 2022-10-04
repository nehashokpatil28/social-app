
const initializeStudent = {
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    nationality: '',
    ID:null
}

export const studentRecordReducer = (state = { ...initializeStudent }, action) => {
    switch (action.type) {
        case "INIT_STUDENT_RECORD_DATA":
            return { ...initializeStudent }
        case "SET_SELECTED_STUDENT_RECORD":
            return { ...action.payload };
        default:
            return { ...state };
    }
};

export const studentListReducer = (state = [{...initializeStudent}], action) => {
    switch (action.type) {
        case "INTI_STUDENT_LIST_DATA":
            return [{ ...initializeStudent }]           
        
        case "SET_STUDENT_LIST":
            return [...action.payload];
        default:
            return [...state];
    }
};
