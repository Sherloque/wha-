const initialState = {
    news: {}
}

function newsReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_NEWS":
            console.log(action.payload)
            return {
                ...state,
                news: action.payload
            };
        default:
            return state;
    }
}

export default newsReducer;