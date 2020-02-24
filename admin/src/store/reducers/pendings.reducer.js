const initialState = {
    pendings: {}
}

function pendingsReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_PENDINGS":
            console.log(action.payload)
            return {
                ...state,
                pendings: action.payload
            };
        default:
            return state;
    }
}

export default pendingsReducer;