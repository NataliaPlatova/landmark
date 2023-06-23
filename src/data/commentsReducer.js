import { CREATE_COMMENT, FETCH_COMMENTS } from "./types";

const initialState = {
    comments: [],
};

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS: {
            return {
                ...state,
                comments: action.payload,
            };
        }
        case CREATE_COMMENT: {
            state.comments.unshift(action.payload);
            return {
                ...state,
                comments: state.comments,
            };
        }
        default:
            return state;
    }
};
