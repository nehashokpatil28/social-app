export const initFamilyRecord = (action) => {
    return { type: 'INIT_FAMILY_LIST_DATA' }
}

export const setFamilyRecord = (action) => {
    return {
        type: "SET_FAMILY_MEMBER", payload: action
    }
}