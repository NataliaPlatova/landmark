import { FETCH_COMMENTS } from "./types";

export function fetchComments() {
    return async dispatch => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=20`);
        //const res = await fetch(`https://landmark-e09dc-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json`)
        const comments = await res.json();
        dispatch({
            type: FETCH_COMMENTS,
            payload: comments
        })
    }
}