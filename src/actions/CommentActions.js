import { FETCH_COMMENTS } from "../data/types";
import getCommentsList from "../services/comments";

export const CommentListActions = {
    getComments() {
        return async (dispatch) => {
            const fetchedComments = await getCommentsList();
            dispatch({
                type: FETCH_COMMENTS,
                payload: fetchedComments,
            });
        };
    },
};
