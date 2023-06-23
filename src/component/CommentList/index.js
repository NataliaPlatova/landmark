import React, { useEffect, useState } from "react";

import s from "./CommentList.module.scss";
import Comment from "../Comment";
import Search from "../Search";
import FilterCommentsButton from "../FilterCommentsButton";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CommentListActions } from "../../actions/CommentActions";

const CommentList = (props) => {
    const { activeComment, onCommentClick, onFiltersChange, inputMask, uid, myUid } = props;
    const [commentSelected, setCommentSelected] = useState(activeComment);
    const dispatch = useDispatch();
    const commentsList = useSelector((state) => state.comments.comments, shallowEqual);

    useEffect(() => {
        dispatch(CommentListActions.getComments());
    }, []);

    useEffect(() => {
        setCommentSelected(activeComment.id);
    }, [activeComment.id]);

    useEffect(() => {
        if (commentsList.length > 0) {
            setCommentSelected(commentsList[0].id);
        }
    }, [commentsList.length]);

    const changeSelectedComment = (comment) => {
        if (activeComment.id !== comment.id) {
            onCommentClick(comment);
        }
    };

    return (
        <div className={s.commentList}>
            <div className={s.filters}>
                <Search onSearch={onFiltersChange} uid={uid} myUid={myUid} />
                <FilterCommentsButton
                    filterClickHandler={onFiltersChange}
                    inputMask={inputMask}
                    myUid={myUid}
                />
            </div>
            {!!commentsList &&
                commentsList.length &&
                commentsList.map((item) => (
                    <button
                        onClick={() => changeSelectedComment(item)}
                        className={
                            commentSelected === item.id
                                ? `${s.commentTab} ${s.commentTab_active}`
                                : `${s.commentTab}`
                        }
                        key={item.id}
                    >
                        <Comment comment={item} />
                    </button>
                ))}
        </div>
    );
};

export default CommentList;
