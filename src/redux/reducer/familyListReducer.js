  
const initializeStudent = {
    firstName: '',
    nationality: {
      ID: '',
      Title: ''
    },
    relationship: ''
}

export const familyListReducer = (state = [{...initializeStudent}], action) => {
    switch (action.type) {
        case "INIT_FAMILY_LIST_DATA":
            return [{ ...initializeStudent }]
        case "GET_FAMILY_LIST":
            return [...state];
        case "SET_FAMILY_MEMBER":
            return [...action?.payload];
        default:
            return [...state];
    }
};


